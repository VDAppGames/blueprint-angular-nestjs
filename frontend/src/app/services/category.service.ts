import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Category } from '../models/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  // Récupérer les catégories de dépense
  getCategories() {
    return this.http.get<Category[]>(`${environment.apiUrl}/category`);
  }
}
