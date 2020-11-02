import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import * as tools from '../../db_helper';

@Injectable()
export class ExpenseService {

  // Récupérer les dépenses
  getExpenses() {
    return tools.query('SELECT * FROM expense');
  }

  // Ajouter une dépense
  postExpense(expense) {
    return tools.query('INSERT INTO expense(uid, date, descrtiption, amount, vat, "totalAmount", "categoryUid", "currencyUid", "vatRateUid")'
    + 'VALUES ((SELECT uuid_generate_v4()),$1, $2, $3, $4, $5, $6, $7, $8)', Object.values(expense));
  }

  // Mettre à jour une dépense
  putExpense(expense) {
    return tools.query('UPDATE expense SET date=$1, descrtiption=$2, amount=$3, vat=$4, "totalAmount"=$5, "categoryUid"=$6, "currencyUid"=$7, "vatRateUid"=$8'
    + 'WHERE uid=$9', Object.values(expense));
  }

  // Supprimer une dépense
  deleteExpense(uid) {
    return tools.query("DELETE FROM expense WHERE uid='" + uid + "'");
  }
}
