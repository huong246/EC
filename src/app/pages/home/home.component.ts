import {Component, inject, OnInit, signal} from '@angular/core';
import {HeaderComponent} from '../../layout/header/header.component';
import {CommonModule} from '@angular/common';
import {ItemService} from '../../services/item.service';
import {combineLatest, Observable, switchMap} from 'rxjs';
import {Item} from '../../models/product/item.model';
import {PagedResponse} from '../../models/shared/api-response.model';
import {map} from 'rxjs/operators';
import {GetItemsRequest} from '../../models/product/item.model';
import {CustomerUpSellerService} from '../../services/customer-up-seller.service';
import {CustomerUpSeller} from '../../models/CustomerUpSeller/CustomerUpSeller.model';
import {RequestStatus} from '../../models/shared/enum';
import {AuthService} from '../../services/authService';
import {UserRole} from '../../models/shared/enum';
import {environment} from '../../../environments/environment';
import {CreateItemRequest} from '../../models/product/item.model';
import {HttpClient} from '@angular/common/http';
import {CategoryService} from '../../services/category.service';
import {Category} from '../../models/product/category.model';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private itemService= inject(ItemService);
  private customerUpSellerService = inject(CustomerUpSellerService);
  private authService = inject(AuthService);
  private categoryService = inject(CategoryService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  items$!: Observable<Item[]>;
  categories$!: Observable<Category[]>;

  currentUserRole = signal<string>(UserRole.Customer);
//phuong thuc se chay 1 lan sau khi component duoc tao ra=> hien thi san pham o trang chu
  //ngOnInit khac voi component: ngOnInit se duoc goi sau khi component duoc tao ra va gan gia tri cho tat ca input
  //component thi duoc goi ngay lap tuc khi 1 component duoc khoi tao bang toan tu new
  ngOnInit(): void {

    this.currentUserRole.set(this.authService.getCurrentUserRole());

    this.categories$ = this.categoryService.getAllCategories();

    this.items$ = combineLatest([this.route.paramMap, this.route.queryParamMap]).pipe(
      switchMap(([params, queryParams]) =>{
        const categoryId = params.get('categoryId');
        const searchTerm = queryParams.get('searchTerm');
        const request: GetItemsRequest ={page:1, pageSize:12};
        if(categoryId)
        {
          request.categoryId = categoryId;
          return this.itemService.getItems(request).pipe(map(res=>res.items));
        }
        if(searchTerm)
        {
          request.searchTerm = searchTerm;
          return this.itemService.getItems(request).pipe(map(res=>res.items));
        }
        return this.itemService.getRandomItems();
      })
    );
  }

  // onCategoryClick(categoryId: string): void
  // {
  //   console.log('Fetching items for category', categoryId);
  //   this.items$ = this.itemService.getItems({categoryId: categoryId, page:1, pageSize: 10}).pipe(
  //     map(pagedResponse => pagedResponse.items)
  //   );
  // }
  handleSearch(searchTerm: string): void
  {
    this.router.navigate(['/home'], {
      queryParams: { searchTerm: searchTerm }
    });
  }
  public readonly baseUrl = environment.serverUrl;

  getFullImageUrl(relativePath: string | null): string {
    if (relativePath) {
      return `${this.baseUrl}${relativePath}`;
    }
    return './assets/images/Default.jpg';
  }
}
