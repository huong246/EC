import {Component, inject, OnInit} from '@angular/core';
import {CommonModule, CurrencyPipe} from '@angular/common';
import {CartService} from '../../services/cart.service';
import {Observable} from 'rxjs';
import {CartItem} from '../../models/order/cart.model';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-cart.component',
  imports: [CommonModule, CurrencyPipe],
  standalone: true,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent   {
  private cartService = inject(CartService);
  cartItems$!: Observable<CartItem[]>;

  constructor() {
  }
  ngOnInit() {
   this.cartItems$ = this.cartService.loadCart();
  }

  removeItem(itemId: string): void {
    if(confirm('Are you sure you want to remove this item?')) {
      this.cartService.removeItem(itemId).subscribe(
        {
          next: () =>
          {
            console.log('removed item successfully');
          },
          error: (err) =>
          {
            console.error('logout failed', err);
          }
        }
      )
    }
  }

  updateQuantity(itemId: string, event: any): void {
    const quantity = parseInt(event.target.value, 10);
    if(quantity<1 || isNaN(quantity))
    {
      event.target.value=1;
    }
    const request = {itemId: itemId, quantity: quantity};
    this.cartService.updateQuantityItemInCart(request).subscribe(
      {
        next: () =>
        {
          console.log('updated item successfully');
        },
        error: (err) =>
        {
          console.error('logout failed', err);
        }
      }
    )
  }

  clearCart(): void {
    if(confirm('Are you sure you want to clear your Cart?')) {
      this.cartService.clearCart().subscribe(
        {
          next: () =>
          {
            console.log('cleared cart successfully');
          },
          error: (err)=> {
            console.error('clear failed', err);
          }
        }
      )
    }
  }



}
