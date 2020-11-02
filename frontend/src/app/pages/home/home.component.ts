import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryComponent } from 'src/app/modals/category/category.component';
import { ExpenseComponent } from 'src/app/modals/expense/expense.component';
import { Category } from 'src/app/models/Category';
import { Currency } from 'src/app/models/Currency';
import { Expense } from 'src/app/models/Expense';
import { Rate } from 'src/app/models/Rate';
import { ExpenseService } from 'src/app/services/expense.service';
import { InteractionHelper } from 'src/app/helpers/interaction.helper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  expensesSortAsc: boolean = true;
  expenses: Expense[] = [];
  expensesFiltered: Expense[];
  categories: Category[] = [];
  currencies: Currency[] = [];
  rates: Rate[] = [];

  constructor(private interactionHelper: InteractionHelper,
    private route: ActivatedRoute,
    private expensesService: ExpenseService) { }

  ngOnInit() {
    let data = this.route.snapshot.data["data"];
    this.expenses = data[0];
    this.expensesFiltered = data[0];
    this.sortExpensesByDate();
    this.currencies = data[1];
    this.categories = data[2];
    this.rates = data[3];
  }

  // Ajouter une dépense
  addExpense() {
    this.openModalCategory();
  }

  // Voir le détail de la dépense
  detailExpense(expense) {
    this.openModalExpense(this.getCategory(expense.categoryUid), expense, true);
  }

  // Mettre à jour la dépense
  updateExpense(expense) {
    this.openModalExpense(this.getCategory(expense.categoryUid), expense);
  }

  // Trier les dépenses
  sortExpense() {
    this.expensesSortAsc = !this.expensesSortAsc;
    this.sortExpensesByDate();
  }

  // Filtrer les dépenses via la barre de recherche
  onSearchExpense(event) {
    const val = event.target.value.toLocaleLowerCase().trimLeft().trimRight();
    if (val && val.trim() !== '') {
      this.expensesFiltered = this.expenses.filter(x =>
        x.descrtiption.toLocaleLowerCase().includes(val)
        || x.totalAmount.toString().includes(val)
        || this.getCategoryLabel(x.categoryUid).toLocaleLowerCase().includes(val)
        || this.getCurrencyCode(x.currencyUid).toLocaleLowerCase().includes(val));
    } else {
      this.expensesFiltered = this.expenses;
    }
  }

  // Supprimer la dépense
  async deleteExpense(uid) {
    this.interactionHelper.confirmAlert('La dépense va être supprimée. Continuer ?', () => {
      this.expensesService.deleteExpense(uid, () => {
        this.refreshExpenses();
      }).subscribe();
    });
  }

  // Ouvrir le modal de catégorie
  async openModalCategory() {
    this.interactionHelper.openModal(CategoryComponent, { categories: this.categories }).then(res => {
      if (res.data) {
        this.openModalExpense(res.data);
      }
    });
  }

  // Ouvrir le modal de dépense
  async openModalExpense(categorySelected, expense = null, isDetail = false) {
    this.interactionHelper.openModal(ExpenseComponent, { categorySelected: categorySelected, currencies: this.currencies, rates: this.rates, expense: expense, isDetail: isDetail }).then(res => {
      if (res.data) {
        if (res.data.reloadAfter) {
          this.refreshExpenses();
        }
        if (res.data.expenseToDelete) {
          this.deleteExpense(res.data.expenseToDelete)
        }
      }
    });
  }

  // Rafraîchir les dépenses
  refreshExpenses(activeMessageSuccess = false) {
    this.expensesService.getExpenses(true, activeMessageSuccess, (res) => {
      this.expenses = res;
      this.expensesFiltered = res;
      this.sortExpensesByDate();
    }).subscribe();
  }

  // Trier les dépenses par date
  sortExpensesByDate() {
    if (this.expensesSortAsc) {
      this.expensesFiltered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else {
      this.expensesFiltered.sort((b, a) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
  }

  // Récupérer une catégorie
  getCategory(categoryUid) {
    return this.categories.find(x => x.uid == categoryUid);
  }

  // Récupérer le label d'une catégorie
  getCategoryLabel(categoryUid) {
    return this.getCategory(categoryUid).label;
  }

  // Récupérer l'icon d'une catégorie
  getCategoryIcon(categoryUid) {
    return this.getCategory(categoryUid).icon;
  }

  // Récupérer une devise
  getCurrency(currencyUid) {
    return this.currencies.find(x => x.uid == currencyUid);
  }

  // Récupérer le code d'une devise
  getCurrencyCode(currencyUid) {
    return this.getCurrency(currencyUid).code;
  }

  // Récupérer le cours d'une devise
  getCurrencyRate(currencyUid) {
    return this.getCurrency(currencyUid).rate;
  }

  // Cumul TTC (prise en compte des devises étrangères)
  getTotalTTC() {
    return this.expensesFiltered.reduce((sum, x) => sum + (x.totalAmount * this.getCurrencyRate(x.currencyUid)), 0);
  }

  // Cumul TVA (prise en compte des devises étrangères)
  getTotalTVA() {
    return this.expensesFiltered.reduce((sum, x) => sum + (x.vat * this.getCurrencyRate(x.currencyUid)), 0);
  }
}