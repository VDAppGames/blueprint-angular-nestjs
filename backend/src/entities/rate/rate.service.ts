import { Injectable } from '@nestjs/common';
import * as tools from '../../db_helper';

@Injectable()
export class RateService {

  // Récupérer les taux de tva
  getRates() {
    return tools.query('SELECT * FROM "vatRate"');
  }
}
