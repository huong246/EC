import { Component, inject, OnInit } from '@angular/core';
import { combineLatest, Observable, switchMap } from 'rxjs';
import { GetItemsRequest } from '../../models/product/item.model';
import { map } from 'rxjs/operators';
import { CreateShopRequest, Shop } from '../../models/shop/shop.model';
import { ShopService } from '../../services/shop.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
@Component({
  selector: 'app-shop.component',
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
})
export class ShopComponent implements OnInit {
  private shopService = inject(ShopService);
  private http = inject(HttpClient);
  private fb = inject(FormBuilder);
  private router = inject(ActivatedRoute);

  shopForm!: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  isEditMode = false;
  shopId: string | null = null;
  currentAddressId: string | null = null;

  ngOnInit() {
    this.shopForm = this.fb.group({
      name: ['', Validators.required],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
      NameAddress: ['', Validators.required],
      PrepareTime: [2, [Validators.required, Validators.min(1)]],
    });

    this.shopId = this.router.snapshot.paramMap.get('id');
    if (this.shopId) {
      this.isEditMode = true;
    }
  }
  loadShopDataForEdit(id: string): void {
    this.shopService.getShopById(id).subscribe({
      next: (response) => {
        const shopData = response;
        const address = shopData.address;
        const latitude = address.latitude;
        const longitude = address.longitude;
        this.shopForm.patchValue({
          name: shopData.name,
          latitude: address.latitude,
          longitude: address.longitude,
          addressId: address.id,
          nameAddress: address.name,
          prepareTime: shopData.prepareTime,
        });
      },
      error: (err) => {
        console.error('Failed to load store data.', err);
      },
    });
  }

  onsubmit() {}

  onSubmit() {
    if (this.shopForm.invalid) {
      this.errorMessage = 'Please complete all required fields.';
      return;
    }

    this.successMessage = null;
    this.errorMessage = null;
    const request: CreateShopRequest = this.shopForm.value;
    this.shopService.createShop(request).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.successMessage = 'Created shop successfully.';
        } else {
          this.errorMessage = 'error while creating shop.';
        }
      },
      error: (err) => {
        console.log('Error while creating shop.', err);
      },
    });
  }
}
