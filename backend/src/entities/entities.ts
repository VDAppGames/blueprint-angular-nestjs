import { CategoryController } from './category/category.controller';
import { CategoryService } from './category/category.service';
import { CurrencyController } from './currency/currency.controller';
import { CurrencyService } from './currency/currency.service';
import { ExpenseController } from './expense/expense.controller';
import { ExpenseService } from './expense/expense.service';
import { RateController } from './rate/rate.controller';
import { RateService } from './rate/rate.service';

export const controllers = [CurrencyController, ExpenseController, CategoryController, RateController];
export const services = [CurrencyService, ExpenseService, CategoryService, RateService];