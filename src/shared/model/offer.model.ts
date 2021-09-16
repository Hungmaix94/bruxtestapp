import dayjs from 'dayjs';
import { IOfferType } from 'app/shared/model/offer-type.model';
import { IOrderType } from 'app/shared/model/order-type.model';

interface IOfferDeviceAccessory {
  id?: number;
  deviceAccessoryTypeId?: number;
  quantity?: number;
  amount?: number;
  enumKey?: string;
}
export interface IOffer {
  currencyId?: any;
  vatTypeId?: any;
  id?: number;
  monthLength?: number | null;
  name?: string;
  description?: string | null;
  periodStartDate?: string | null;
  periodEndDate?: string | null;
  amount?: number;
  isActive?: boolean | null;
  offerType?: IOfferType;
  orderType?: IOrderType;
  orderTypeId?: number;
  offerTypeId?: number;
  deviceNetPrice?: number;
  deviceQuantity?: number;
  offerDeviceAccessories?: IOfferDeviceAccessory[];
  deviceTypeId?: number;
}

export const defaultValue: Readonly<IOffer> = {
  isActive: false,
};
