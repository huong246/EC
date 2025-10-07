import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Category} from '../models/product/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/Category`;
  getAllCategories(): Observable<Category[]>
  {
    return this.http.get<Category[]>(`${this.apiUrl}/get-all-categories`);
  }
}
