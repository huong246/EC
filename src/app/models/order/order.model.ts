import {OrderShop} from './orderShop.model';
import {Item} from '../product/item.model';
import {Shop} from '../shop/shop.model';
import {User} from '../auth/user.model';
import {Address} from '../address/address.model';
import {OrderStatus} from '../shared/enum';

export interface Order {
  id: string;
  userId: string;
  user: User | null;
  totalAmount: number;
  totalShippingFee: number;
  totalSubtotal: number;
  discountProductAmount: number;
  discountShippingAmount: number;
  userAddress: Address;
  userAddressId: string;
  voucherProductId: string;
  voucherShippingId: string;
  status: OrderStatus[];
  orderDate: string;
  orderShops: OrderShop[];
}
export interface CreateOrderRequest {
  cartItemId: string[];
  voucherShop: { [shopId: string]: string } | null;
  voucherProductId:string |null;
  voucherShippingId:string |null;
  latitude: number|null;
  longitude: number|null;
  addressName: string |null;
  addressId: string|null;
}

export interface CreateOrderResponse {
  orderId: string;
  totalAmount: number;
}
export interface CancelMainOrderRequest {
  orderId:string;
  reason:string;
}
export interface CancelAPaidOrderRequest
{
  orderShopId:string;
  reason:string;
}
export interface ApproveCancelAPaidOrderRequest {
  cancelRequestId: string;
}
export interface RejectCancelAPaidOrderRequest {
  cancelRequestId: string;
  reason: string;
}
export interface ShipOrderShopRequest {
  orderShopId: string;
}
export interface SellerCancelOrderRequest {
  orderShopId: string;
  reason: string;
}
export interface MarkShopOrderAsDeliveredRequest {
  orderShopId: string;
  note?: string;
}
export interface MarkOrderShopAsCompletedRequest {
  orderShopId: string;
}
export interface CancelEntireOrderRequest {
  orderId: string;
  reason: string;
}
export interface ProcessReturnRequestRequest {
  returnOrderId: string;
  isApproved: boolean;
  reason?: string;
}
