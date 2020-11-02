import { Controller, Get } from '@nestjs/common';
import { CurrencyService } from './currency.service';

@Controller('currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) { }

  // Récupérer les devises
  @Get()
  getCurrencies() {
    return this.currencyService.getCurrencies();
  }
}
