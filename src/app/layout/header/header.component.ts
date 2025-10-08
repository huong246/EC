import {Component, EventEmitter, inject, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterModule} from '@angular/router';
import {AuthService} from '../../services/authService';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  //khai bao 1 su kien dau ra=> nguoi dung nhap tim kiem trong header thi se phat ra emit du lieu tim kiem cho component cha xu ly
  @Output() search = new EventEmitter<string>();
  onSearch(searchTerm: string): void {
    this.search.emit(searchTerm);
  }
//su dung subscribe de xu ly ket qua
  logout(): void {
    this.authService.logout().subscribe(
      {
        next: ()=> {
          console.log('Logged out');
          this.router.navigate(['/login']);
        },
        error: (err)=> {
          console.error('logout failed', err);
          this.router.navigate(['/login']);
        }
      }
    )
  }


}
