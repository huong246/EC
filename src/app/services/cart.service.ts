import { Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {BehaviorSubject, Observable, switchMap, tap, throwError} from 'rxjs';
import {AddItemToCartRequest, CartItem,   UpdateQuantityItemInCartRequest} from '../models/order/cart.model';
import {HttpClient} from '@angular/common/http';
import {ApiResponse} from '../models/shared/api-response.model';
import {map} from 'rxjs/operators';
import {provideRouter} from '@angular/router';
import {routes} from '../app.routes';



@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = `${environment.apiUrl}/CartItem`;
  private _cartItems$ = new BehaviorSubject<CartItem[]>([]);
  public readonly cartItems$: Observable<CartItem[]> = this._cartItems$.asObservable();
  constructor(private http: HttpClient) {
  }
  initCart(): Observable<CartItem[]> {
    return this.loadCart();
  }
  //load gio hang moi khi service duoc khoi tao
  //.pipe tao cac toan tu bien doi, ket hop, loc
  loadCart(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.apiUrl}/load-cart`).pipe(
      // map(items=> {
      //   return items.map(item => { ({...item, isSelected: false}) as CartItemsUI})
      // }),
      tap(items =>this._cartItems$.next(items)) //cap nhat
    );
  }

  addItemToCart(request: AddItemToCartRequest): Observable<any>
  {
    return this.http.post<ApiResponse<CartItem>>(`${this.apiUrl}/add_item_to_cart`, request).pipe(
      switchMap(result =>
      {
        if(result.isSuccess)
        {
          return this.loadCart();
        }
        else {
          return throwError(() => new Error(result.error || 'Database error'));
        }
      })
    );
  }

  updateQuantityItemInCart(request: UpdateQuantityItemInCartRequest): Observable<any>
  {
    return this.http.put<ApiResponse<CartItem>>(`${this.apiUrl}/update_quantity_item_in_cart`, request).pipe(  switchMap(() => this.loadCart()));
  }

  removeItem(itemId:string): Observable<any>
  {
    return this.http.delete(`${this.apiUrl}/delete_item_from_cart`, {}).pipe(
      switchMap(() => this.loadCart())
    );
  }

  //chua viet logic trong backend
  clearCart():Observable<any>
  {
    return this.http.delete(this.apiUrl).pipe(
      tap(items=> this._cartItems$.next([]))
    );
  }
}
