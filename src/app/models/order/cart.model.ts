import { Item} from '../product/item.model';
import { User} from '../auth/user.model';
import { Shop} from '../shop/shop.model';

export interface CartItem {
  id: string;
  itemId: string;
  item: Item | null;
  shopId: string;
  shop: Shop | null;
  userId: string;
  user: User | null;
  quantity: number;
}
export interface AddItemToCartRequest
{
  itemId: string;
  quantity: number;
}
export interface UpdateQuantityItemInCartRequest
{
  itemId:string;
  quantity:number;
}

