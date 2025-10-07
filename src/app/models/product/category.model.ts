import { Item } from './item.model';

export interface Category {
  id: string; //guid trong c# duoc chuyen thanh string json
  name: string;
  items: Item[];
}

export interface CreateCategoryRequest {
  name: string;
}

export interface UpdateCategoryRequest {
  categoryId: string;
  name: string;
}
