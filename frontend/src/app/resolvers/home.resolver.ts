import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, zip } from 'rxjs';
import { CurrencyService } from '../services/currency.service';
import { ExpenseService } from '../services/expense.service';
import { CategoryService } from '../services/category.service';
import { RateService } from '../services/rate.service';
import { ObservableHelper } from '../helpers/observable.helper';

@Injectable()
export class HomeResolver implements Resolve<any> {
  constructor(
    private expensesService: ExpenseService, 
    private currencyService: CurrencyService, 
    private categoryService: CategoryService, 
    private rateService: RateService, 
    private observableHelper: ObservableHelper) {}
  
  // Récupération des données nécessaires pour la page Home
  resolve(): Observable<any> {
    let groupObservables = zip(this.expensesService.getExpenses(), this.currencyService.getCurrencies(), this.categoryService.getCategories(), this.rateService.getRates());
    return this.observableHelper.observableCustom(groupObservables, null, 'Une erreur est survenue');
  }
}