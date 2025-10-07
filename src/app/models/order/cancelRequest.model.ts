import {OrderShop} from './orderShop.model';
import{ ReturnStatus} from '../shared/enum'
import {User} from '../auth/user.model';
import {Order} from './order.model';
import {RequestStatus} from '../shared/enum';

export interface CancelRequest {
  id: string;
  orderShopId: string;
  orderShop: OrderShop | null;
  status: RequestStatus;
  reason: string | null;
  requestAt: string;
  reviewAt: string;
  userId: string;
  user: User | null;
  orderId: string;
  order: Order | null;
  amount: number;
}
