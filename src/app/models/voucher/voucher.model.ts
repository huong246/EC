import {Shop} from '../shop/shop.model';
import {Item} from '../product/item.model';

export enum Target {
  Product = 'Product',
  Shipping = 'Shipping',
  Shop = 'Shop',
}
export enum Method {
  FixAmount = 'FixAmount',
  Percentage = 'Percentage',
}
export interface Voucher {
  id: string;
  code: string | null;
  voucherTarget: Target;
  voucherMethod: Method;
  itemId: string;
  item: Item;
  shopId: string;
  shop: Shop;
  maxValue: number;
  value: number;
  minSpend: number;
  quantity: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  version: string;
}
export interface CreateVoucherRequest
{
  shopId: string |null;
  itemId: string |null;
  lengthCode: number;
  quantity: number;
  value: number;
  method: Method;
  target: Target;
  maxDiscountAmount: number |null;
  startDate: string;
  endDate: string;
  minSpend: number |null;
  isActive: boolean;
}
export interface UpdateVoucherRequest
{
  voucherId:string;
  shopId: string |null;
  itemId: string |null;
  lengthCode: number|null;
  quantity: number|null;
  value: number|null;
  method: Method|null;
  target: Target|null;
  maxDiscountAmount: number |null;
  startDate: string;
  endDate: string |null;
  minSpend: number |null;
  isActive: boolean |null;

}
