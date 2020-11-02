import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Category } from 'src/app/models/Category';
import { Currency } from 'src/app/models/Currency';
import { Expense } from 'src/app/models/Expense';
import { Rate } from 'src/app/models/Rate';
import { ExpenseService } from 'src/app/services/expense.service';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss']
})
export class ExpenseComponent implements OnInit {
  @Input() public categorySelected: Category;
  @Input() public currencies: Currency[];
  @Input() public rates: Rate[];
  @Input() public expense: Expense;
  @Input() public isDetail: boolean;
  expenseForm: FormGroup;
  currentDate: String = new Date().toISOString();

  constructor(private modalCtrl: ModalController, private formBuilder: FormBuilder, private expensesService: ExpenseService) {}

  // Initialiser de la validation du formulaire de dépense
  ngOnInit() {
    this.expenseForm = this.formBuilder.group({
      currency: [this.expense ? this.currencies.find(x => x.uid == this.expense.currencyUid) : '', Validators.required],
      tva: [this.expense ? this.rates.find(x => x.uid == this.expense.vatRateUid) : '', Validators.required],
      amount: [this.expense ? this.expense.amount : '', Validators.required],
      date: [this.expense ? this.expense.date : ''],
      description: [this.expense ? this.expense.descrtiption : ''],
    });
  }

  // Valider / Modifier la dépense
  validate(isUpdate = false) {
    let expense = {} as Expense;
    expense.date = this.expenseForm.value.date;
    expense.descrtiption = this.expenseForm.value.description;
    expense.amount = this.expenseForm.value.amount;
    expense.vat = this.expenseForm.value.amount * this.expenseForm.value.tva.rate;
    expense.totalAmount = expense.amount + expense.vat;
    expense.categoryUid = this.categorySelected.uid;
    expense.currencyUid = this.expenseForm.value.currency.uid;
    expense.vatRateUid = this.expenseForm.value.tva.uid;

    if (!isUpdate) {
      this.expensesService.postExpense(expense, () => {
        this.close(true);
      }).subscribe();
    } else {
      expense.uid = this.expense.uid;
      this.expensesService.putExpense(expense, () => {
        this.close(true);
      }).subscribe();
    }
  }

  // Activer la modification 
  enableUpdate() {
    this.isDetail = false;
  }

  // Demander la suppression
  demandDelete() {
    this.close(false, this.expense.uid)
  }

  // Fermer le modal
  close(reloadAfter = false, expenseToDelete = null) {
    this.modalCtrl.dismiss({ reloadAfter, expenseToDelete });
  }
}
