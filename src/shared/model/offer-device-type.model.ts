import { IOffer } from 'app/shared/model/offer.model';
import { IDeviceType } from 'app/shared/model/device-type.model';

export interface IOfferDeviceType {
  id?: number;
  deviceQuantity?: number | null;
  offer?: IOffer;
  deviceType?: IDeviceType;
}

export const defaultValue: Readonly<IOfferDeviceType> = {};
