import {User} from '../auth/user.model';

export interface Address {
  id: string;
  name: string;
  userId: string;
  user: User;
  longitude: number;
  latitude: number;
  isDefault: boolean;
}
