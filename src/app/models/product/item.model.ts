import {Review} from './review.model';
import {ItemImage} from './itemImage.model';
import {Category} from './category.model';
export interface Item {
  id: string;
  name: string | null;
  price: number;
  stock: number;
  description: string | null;
  color: string | null;
  size: string | null;
  saleCount: number;
  version: string;
  shopId: string;
  itemImages: ItemImage[];
  categoryId: string;
  category: Category;
  reviews: Review[];
  imageAvatarUrl: string | null;
}
export interface CreateItemRequest {
  name: string;
  stock: number;
  price: number;
  description: string;
  color: string;
  size: string;
  categoryId: string;
}

export interface UpdateItemRequest {
  itemId: string;
  name: string;
  stock: number;
  price: number;
  description: string;
  color: string;
  size: string;
  categoryId: string;
}
export interface GetItemsRequest {
  categoryId?: string | null;
  searchTerm?: string | null;
  sortBy?: string | null;
  minPrice?: number | null;
  maxPrice?: number | null;
  page?: number;
  pageSize?: number;
}
export interface ItemResponse {
  id:string;
  name?: string | null;
  price?: number | null;
  description?: string | null;
  color?: string | null;
  size?: string | null;
  catrgoryId: string;
  categoryName?:string | null;
  imageAvatarUrl?: string | null;
}
export interface CreateItemResponse {
  item: Item;
}
