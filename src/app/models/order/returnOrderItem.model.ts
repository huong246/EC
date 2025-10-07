import {ReturnStatus} from '../shared/enum';
import {ReturnOrder} from './returnOrder.model';
import {OrderItem} from './orderItem.model';
export interface ReturnOrderItem {
  id: string;
  returnOrderId: string;
  returnOrder: ReturnOrder;
  orderItemId: string;
  orderItem: OrderItem;
  status: ReturnStatus;
  reason: string | null;
  quantity: number;
  returnShippingTrackingCode: string | null;
  amount: number;
}
export interface ReturnOrderItemRequest {
  orderId: string;
  itemsReturn: { [itemId: string]: number };
  reason: string;
}
export interface ReturnOrderItemResponse {
  returnOrderId: string;
  returnOrderItems: { [itemId: string]: string }; // Dictionary<Guid, string> -> { [key: string]: string }
}
export interface ApproveReturnOrderItemRequest {
  returnOrderId: string;
  returnOrderItemsId: string[];
}
export interface RejectReturnOrderItemRequest {
  returnOrderId: string;
  rejectReturnOrderItems: { [itemId: string]: string };
}
