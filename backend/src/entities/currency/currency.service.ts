import { Injectable } from '@nestjs/common';
import * as tools from '../../db_helper';

@Injectable()
export class CurrencyService {

    // Récupérer les devises
    getCurrencies() {
        return tools.query('SELECT * FROM currency');
    }
}
