import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../environments/environment'
import { jwtDecode } from 'jwt-decode';
import {
  ForgotPasswordRequest,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  ResetPasswordRequest,
  SimpleApiResponse
} from '../models/auth/auth.model';
import {Observable, tap, throwError, catchError} from 'rxjs';
import {User} from '../models/auth/user.model';
import {RefreshTokenRequest} from '../models/auth/auth.model'
import { ApiResponse } from '../models/shared/api-response.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/User`;
  register(data: RegisterRequest): Observable<User>
  {
    return this.http.post<User>(`${this.apiUrl}/register_user`, data);
  }

  login(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login_user`, data).pipe(
      tap(response => {

        this.storeTokens(response);
      }),
      catchError(this.handleError)
    );
  }
  logout(): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/logout_user`, {}).pipe(
      tap(() => this.removeTokens())
    );
  }
  private storeTokens(tokens: LoginResponse): void {
    if (tokens && tokens.accessToken && tokens.refreshToken) {
      localStorage.setItem('accessToken', tokens.accessToken);
      localStorage.setItem('refreshToken', tokens.refreshToken);
    }
  }
  isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }

  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  private getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  private handleError(error: HttpErrorResponse): Observable<never> {

    let errorMessage = 'An unknown error occurred!';
    if (typeof error.error === 'string') {
      errorMessage = error.error;
    } else if (error.message) {
      errorMessage = error.message;
    }
    return throwError(() => new Error(errorMessage));
  }

  private removeTokens(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  refreshToken(): Observable<LoginResponse> {
    const accessToken = this.getAccessToken();
    const refreshToken = this.getRefreshToken();
    if (!refreshToken || !accessToken) {
      return throwError(() => new Error('No refresh token available'));
    }

    const request: RefreshTokenRequest = {accessToken, refreshToken };

    return this.http.post<LoginResponse>(`${this.apiUrl}/refresh_token`, request).pipe(
      tap(response => {
        this.storeTokens(response);
      })
    );
  }
  forgotPassword(data: ForgotPasswordRequest): Observable<SimpleApiResponse>
  {
    const request: ForgotPasswordRequest = {email: data.email};
    return this.http.post<SimpleApiResponse>(`${this.apiUrl}/forgot_password`, request);
  }
  resetPassword(data: ResetPasswordRequest): Observable<SimpleApiResponse>
  {
    return this.http.post<SimpleApiResponse>(`${this.apiUrl}/reset_password`, data).pipe(
      catchError(this.handleError)
    );

  }
  private readonly GUEST_ROLE = 'Guest';
  getCurrentUserRole(): string {
      const token = this.getAccessToken();
      if (!token) {
        return this.GUEST_ROLE;
      }
      try {
        const decodedToken: any = jwtDecode(token);
        const role = decodedToken.role;
        if (role) {
          if (Array.isArray(role)) {
            return role[0];
          }
          return role;
        }
        return this.GUEST_ROLE;
      } catch (error) {
        console.error('Token invalid', error);
        this.removeTokens();
        return this.GUEST_ROLE;
      }
    }

}
