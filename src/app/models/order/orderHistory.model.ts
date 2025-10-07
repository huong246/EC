import {Order} from './order.model';

export interface OrderHistory {
  id: string;
  createAt: string;
  fromStatus: string | null;
  toStatus: string | null;
  changedByUserId: string | null;
  Note: string | null;
  orderId: string;
  order: Order | null;
  orderShopId: string | null;
  orderItemId: string | null;
}
export interface GetOrderHistoryRequest {
  orderId: string;
}
