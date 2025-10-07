import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {catchError, Observable, of, throwError} from 'rxjs';
import {CustomerUpSeller} from '../models/CustomerUpSeller/CustomerUpSeller.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerUpSellerService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/CustomerUpSeller`;

  createRequest(): Observable<CustomerUpSeller>
  {
    return this.http.post<CustomerUpSeller>(`${this.apiUrl}/customer_up_seller_request`, {});
  }
  getRequest(): Observable<CustomerUpSeller|null>
  {
    return this.http.get<CustomerUpSeller>(`${this.apiUrl}/get_request`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          return of(null);
        }
        throw error;
      })
    );
  }

}
