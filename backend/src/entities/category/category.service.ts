import { Injectable } from '@nestjs/common';
import * as tools from '../../db_helper';

@Injectable()
export class CategoryService {

  // Récupérer les catégories de dépense
  getCategories() {
    return tools.query('SELECT * FROM "expenseCategory"');
  }
}
