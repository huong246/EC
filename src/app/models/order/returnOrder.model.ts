import {ReturnStatus} from '../shared/enum';
import {Order} from './order.model';
import {User} from '../auth/user.model';
import {ReturnOrderItem} from './returnOrderItem.model';

export interface ReturnOrder {
  id: string;
  orderId: string;
  order: Order | null;
  userId: string;
  user: User | null;
  status: ReturnStatus;
  requestAt: string;
  reviewAt: string;
  returnOrderItems: ReturnOrderItem[];
  amount: number;
}
