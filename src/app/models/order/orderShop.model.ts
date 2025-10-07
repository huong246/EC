import {Order} from './order.model';
import {Item} from '../product/item.model';
import {Shop} from '../shop/shop.model';
import {User} from '../auth/user.model';
import {Address} from '../address/address.model';
import {Voucher} from '../voucher/voucher.model';
import {OrderShopStatus} from '../shared/enum';

export interface OrderShop {
  id: string;
  orderId: string;
  order: Order | null;
  discountShopAmount: number;
  voucherShopId: string | null;
  voucherShop: Voucher | null;
  voucherShopCode: string | null;
  totalShopAmount: number;
  status: OrderShopStatus;
  notes: string | null;
  shopId: string;
  shop: Shop | null;
  subtotalShop: number;
  shippingFee: number;
  deliveredDate: string | null;
  trackingCode: string | null;
}
