import {Order} from './order.model';
import {OrderShop} from './orderShop.model';
import {Item} from '../product/item.model';
import {Shop} from '../shop/shop.model';
import {OrderItemStatus} from '../shared/enum';

export interface OrderItem {
  id: string;
  orderShopId: string | null;
  orderShop: OrderShop | null;
  itemId: string;
  item: Item | null;
  quantity: number;
  price: number;
  totalAmount: number;
  shopId: string;
  shop: Shop | null;
  status: OrderItemStatus;
}
