import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ExpenseService } from './expense.service';

@Controller('expense')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  // Récupérer les dépenses
  @Get()
  getExpenses() {
    return this.expenseService.getExpenses();
  }

  // Ajouter une dépense
  @Post()
  postExpense(@Body() expense) {
    return this.expenseService.postExpense(expense);
  }

  // Mettre à jour une dépense
  @Put()
  putExpense(@Body() expense) {
    return this.expenseService.putExpense(expense);
  }

  // Supprimer une dépense
  @Delete(':uid')
  deleteExpense(@Param('uid') uid) {
    return this.expenseService.deleteExpense(uid);
  }
}
