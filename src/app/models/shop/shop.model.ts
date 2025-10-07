import {User} from '../auth/user.model';
import {Address} from '../address/address.model';
import {Voucher} from '../voucher/voucher.model';

export interface Shop
{
  id:string;
  userId:string;
  user:User;
  addressId:string;
  address: Address;
  name:string;
  prepareTime:number;
  voucher: Voucher[];
}

export interface CreateShopRequest
{
  name:string;
  latitude:string;
  longitude:string;
  nameAddress:string;
  prepareTime:number;
}

export interface UpdateShopRequest
{
  id:string;
  name:string;
  addressId:string;
  latitude:string;
  longitude:string;
  nameAddress:string;
  prepareTime:number;
}
