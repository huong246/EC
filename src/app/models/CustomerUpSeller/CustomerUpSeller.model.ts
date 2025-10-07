import {RequestStatus} from '../shared/enum';
import {User} from '../auth/user.model';
export interface CustomerUpSeller {
  id: string;
  userId: string;
  user: User | null;
  status: RequestStatus;
  requestAt: string;
  reviewAt: string;
}
export interface ApproveRequest
{
  customerUpSellerId: string;
}
export interface RejectRequest
{
  customerUpSellerId: string;
}
