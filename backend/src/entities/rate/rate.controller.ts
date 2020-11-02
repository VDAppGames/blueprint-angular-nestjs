import { Controller, Get } from '@nestjs/common';
import { RateService } from './rate.service';

@Controller('rate')
export class RateController {
  constructor(private readonly rateService: RateService) {}

  // Récupérer les taux de tva
  @Get()
  getRates() {
    return this.rateService.getRates();
  }
}
