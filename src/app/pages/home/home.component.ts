import {Component, inject, OnInit, signal} from '@angular/core';
import {HeaderComponent} from '../../layout/header/header.component';
import {CommonModule} from '@angular/common';
import {ItemService} from '../../services/item.service';
import {Observable} from 'rxjs';
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

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private itemService= inject(ItemService);
  private customerUpSellerService = inject(CustomerUpSellerService);
  private authService = inject(AuthService);
  private categoryService = inject(CategoryService);


  items$!: Observable<Item[]>;
  categories$!: Observable<Category[]>;

  currentUserRole = signal<string>(UserRole.Customer);
//phuong thuc se chay 1 lan sau khi component duoc tao ra=> hien thi san pham o trang chu
  //ngOnInit khac voi component: ngOnInit se duoc goi sau khi component duoc tao ra va gan gia tri cho tat ca input
  //component thi duoc goi ngay lap tuc khi 1 component duoc khoi tao bang toan tu new
  ngOnInit(): void {

    this.currentUserRole.set(this.authService.getCurrentUserRole());
    this.items$ = this.itemService.getRandomItems();
    this.categories$ = this.categoryService.getAllCategories();
  }

  onCategoryClick(categoryId: string): void
  {
    console.log('Fetching items for category', categoryId);
    this.items$ = this.itemService.getItems({categoryId: categoryId, page:1, pageSize: 10}).pipe(
      map(pagedResponse => pagedResponse.items)
    );
  }
  handleSearch(searchTerm: string): void
  {
    console.log('Search term', searchTerm);
    const searchRequest: GetItemsRequest = {
      searchTerm: searchTerm,
      page: 1,
      pageSize: 10
    };
    this.items$ = this.itemService.getItems({searchTerm: searchTerm}).pipe(
      map(pageResponse => pageResponse.items),
    );
  }
  public readonly baseUrl = environment.serverUrl;

  getFullImageUrl(relativePath: string | null): string {
    if (relativePath) {
      return `${this.baseUrl}${relativePath}`;
    }
    return './assets/images/Default.jpg';
  }
}
