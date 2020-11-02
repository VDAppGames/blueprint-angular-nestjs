import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Currency } from '../models/Currency';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private http: HttpClient) { }

  // Récupérer les devises
  getCurrencies() {
    return this.http.get<Currency[]>(`${environment.apiUrl}/currency`);
  }
}
