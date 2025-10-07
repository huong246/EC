import {Component, inject} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {AuthService} from '../../services/authService';
import {CommonModule} from '@angular/common';
import {Router, RouterModule} from '@angular/router';

//component bắt buộc để khai báo 1 class. inject: tiêm các dependencies vào component
//onInit: triển khai pthuc ngOnInit
//commonModule: module cung cấp các chỉ thị và pipe: ngIf, ngFor
//formBuilder, formGroup... quản lý form
//router: điều hướng lập trình
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  //bien cho form
  loginForm!: FormGroup;
  errorMessage: string |null = null;
  isLoading = false;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;
    this.authService.login(this.loginForm.value).subscribe(
      {
        next: (response) =>
        {
          this.isLoading = false;
          console.log('login success', response);
          this.router.navigate(['/home']);
        },
        error: (err)=>
        {
          this.isLoading = false;
          this.errorMessage = err.message;
          console.error('login error', err);
        }
      }
    );
  }

}
