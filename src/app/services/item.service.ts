import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {CreateItemRequest, CreateItemResponse, Item} from '../models/product/item.model';
import {GetItemsRequest} from '../models/product/item.model';
import {PagedResponse} from '../models/shared/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private itemApiUrl = `${environment.apiUrl}/Item`; //anh xa toi ItemController
  private categoryApiUrl = `${environment.apiUrl}/Category`;

  constructor(private http: HttpClient) { }
  getRandomItems(count: number =10): Observable<Item[]>
  {
    const url =`${this.itemApiUrl}/list_items_random`;
    return this.http.get<Item[]>(url, {params:{count}});
  }

  getItems(request: GetItemsRequest): Observable<PagedResponse<Item>>
  {
    let params = new HttpParams();
    if(request.page) params = params.set('page', request.page.toString());
    if(request.pageSize) params = params.set('pageSize', request.pageSize.toString());
    if(request.searchTerm) params = params.set('searchTerm', request.searchTerm);
    if(request.categoryId) params = params.set('categoryId', request.categoryId);
    if(request.sortBy) params = params.set('sortBy', request.sortBy);
    if(request.minPrice) params = params.set('minPrice', request.minPrice.toString());
    if(request.maxPrice) params = params.set('maxPrice', request.maxPrice.toString());

    return this.http.get<PagedResponse<Item>>(`${this.categoryApiUrl}/get-items`, {params: params});
  }

  createItem(data: CreateItemRequest): Observable<CreateItemResponse>
  {
    return this.http.post<CreateItemResponse>(`${this.itemApiUrl}/create_item`, data);
  }
}
