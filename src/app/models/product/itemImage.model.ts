import {Item} from './item.model';

export interface ItemImage {
  id: string;
  imageUrl: string | null;
  isAvatar: boolean;
  itemId: string;
  item: Item;
}

export interface UploadItemImageRequest
{
  itemId: string;
  file: File;
  isAvatar: boolean;
}
export interface SetIsAvatarRequest
{
  itemImageId: string;
  isAvatar: boolean;
}

