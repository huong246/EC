import {Component, inject, OnInit} from '@angular/core';
import {ShopService} from '../../services/shop.service';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CreateShopRequest} from '../../models/shop/shop.model';

@Component({
  selector: 'app-create-shop.component',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './create-shop.component.html',
  styleUrl: './create-shop.component.scss'
})
export class CreateShopComponent implements OnInit {
  private shopService = inject(ShopService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private http = inject(HttpClient);
  private fb = inject(FormBuilder);

  shopForm!: FormGroup;
  successMessage: string|null = null;
  errorMessage: string|null = null;

  ngOnInit() {
    this.shopForm = this.fb.group({
      name: ['', Validators.required],
      Latitude: ['', Validators.required],
      Longitude: ['', Validators.required],
      NameAddress: ['', Validators.required],
      PrepareTime: [2,  [Validators.required, Validators.min(1)]],
    });
  }

  onSubmit() {
    if(this.shopForm.invalid)
    {
      this.errorMessage = "Please complete all required fields.";
      return;
    }

    this.successMessage = null;
    this.errorMessage = null;
    const request: CreateShopRequest = this.shopForm.value;
    this.shopService.createShop(request).subscribe(
      {
      next: (response) =>
      {
        if(response.isSuccess )
        {
          this.successMessage = "Created shop successfully.";
          this.router.navigate(['/shop'])
        }
        else
        {
          this.errorMessage = "error while creating shop.";
        }
      },
      error: (err) =>
      {
        console.log('Error while creating shop.', err);
      }
      }
    )

  }




}
