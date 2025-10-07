import {Item} from './item.model';
import {User} from '../auth/user.model';

export interface Review {
  id: string;
  orderId: string;
  itemId: string;
  item: Item;
  userId: string;
  user: User;
  rating: number;
  comment: string | null;
  reviewAt: string;
}

export interface CreateReviewRequest
{
  rating: number;
  comment: string;
  itemId: string;
}
export interface UpdateReviewRequest
{
  reviewId: string;
  rating: number;
  comment: string;
}

