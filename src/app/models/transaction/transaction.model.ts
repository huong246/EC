import {Order} from '../order/order.model';
import {OrderShop} from '../order/orderShop.model';
import {ReturnOrder} from '../order/returnOrder.model';
import {CancelRequest} from '../order/cancelRequest.model';
import {TransactionType} from '../shared/enum';
import {TransactionStatus} from '../shared/enum';

export interface Transaction{
  id:string;
  amount:number;
  fromUserId:string;
  tpUserId:string;
  orderId:string;
  order:Order;
  creatAt:string;
  notes:string;
  orderShopId:string;
  orderShop:OrderShop;
  returnOrderId:string;
  returnOrder:ReturnOrder;
  cancelRequestId:string;
  cancelRequest: CancelRequest;
  type: TransactionType;
  status:TransactionStatus;

}
export interface DepositIntoBalanceRequest
{
  amount:number;
}
//nguoi mua thanh toan
export interface CreatePaymentRequest
{
  orderId: string;
  buyerId:string;
  amount:number;
}
//tien ve nguoi ban
export interface CreatePayoutRequest
{
  orderShopId:string;
  sellerId:string;
  amount:number;
}
export interface CreateRefundRequest
{
  buyerId:string;
  returnOrderId:string;
  amount:number;
}
//nguoi ban huy
export interface CreateRefundWhenCancelRequest
{
  buyerId:string;
  cancelRequestId:string;
  amount:number;
}
//con nua
