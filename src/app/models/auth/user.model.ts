import {Address} from '../address/address.model';
import {UserRole} from '../shared/enum';
export interface User {

  id: string;
  fullName: string;
  birthday: string;
  gender: string;
  balance: number;
  refreshToken: string;
  refreshTokenExpiryTime: string;
  userRole: UserRole[];
  addresses: Address[];
  email:string;
}

export interface UpdateUserProfileRequest
{
  fullName:string;
  email:string;
  phoneNumber:string;
  birthday:string;
  gender:string;
}
export interface UpdatePasswordRequest
{
  oldPassword:string;
  newPassword:string;
}
