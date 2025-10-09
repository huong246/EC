import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {CreateShopRequest, Shop, UpdateShopRequest} from '../models/shop/shop.model';
import {Observable} from 'rxjs';
import {ApiResponse} from '../models/shared/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/Shop`;
  constructor() {}

  createShop(request: CreateShopRequest): Observable<ApiResponse<Shop>>
  {
    return this.http.post<ApiResponse<Shop>>(`${this.apiUrl}/create_shop`, request);
  }

  updateShop(request: UpdateShopRequest): Observable<ApiResponse<Shop>>
  {
    return this.http.put<ApiResponse<Shop>>(`${this.apiUrl}/update_shop`, request);
  }
  getShopById(id: string): Observable<Shop> {
    return this.http.get<Shop>(`${this.apiUrl}/${id}`);
  }
}
