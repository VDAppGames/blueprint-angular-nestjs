import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Rate } from '../models/Rate';

@Injectable({
  providedIn: 'root'
})
export class RateService {

  constructor(private http: HttpClient) { }

  // Récupérer les taux de tva
  getRates() {
    return this.http.get<Rate[]>(`${environment.apiUrl}/rate`);
  }
}
