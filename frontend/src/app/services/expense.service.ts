import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Expense } from '../models/Expense';
import { ObservableHelper } from '../helpers/observable.helper';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(private http: HttpClient, private observableHelper: ObservableHelper) { }

  // Récupérer les dépenses
  getExpenses(activeLoader = false, activeMessageSuccess = false, callback = (res) => { }) {
    if (!activeLoader) {
      return this.http.get<Expense[]>(`${environment.apiUrl}/expense`);
    } else {
      var messageSuccess;
      if (activeMessageSuccess) {
        messageSuccess = "Les dépenses ont été mises à jour !";
      }
      return this.observableHelper.observableCustom(this.http.get<Expense[]>(`${environment.apiUrl}/expense`), messageSuccess, "Les dépenses n'ont pas pu être mises à jour", callback);
    }
  }

  // Ajouter une dépense
  postExpense(expense: Expense, callback) {
    return this.observableHelper.observableCustom(this.http.post(`${environment.apiUrl}/expense`, expense), 'La dépense a été ajoutée !', "La dépsense n'a pas pu être ajoutée", callback);
  }

  // Mettre à jour une dépense
  putExpense(expense: Expense, callback) {
    return this.observableHelper.observableCustom(this.http.put(`${environment.apiUrl}/expense`, expense), 'La dépense a été modifiée !', "La dépsense n'a pas pu être modifiée", callback);
  }

  // Supprimer une dépense
  deleteExpense(uid, callback) {
    return this.observableHelper.observableCustom(this.http.delete(`${environment.apiUrl}/expense/` + uid), 'La dépense a été supprimée !', "La dépsense n'a pas pu être supprimée", callback);
  }
}
