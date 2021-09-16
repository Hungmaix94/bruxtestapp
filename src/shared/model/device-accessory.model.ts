import dayjs from 'dayjs';
import { IDeviceAccessoryStatusType } from 'app/shared/model/device-accessory-status-type.model';
import { IDeviceType } from 'app/shared/model/device-type.model';

export interface IDeviceAccessory {
  id?: number;
  amount?: number;
  orderNumber?: string;
  quantity?: number;
  returnDate?: string | null;
  deviceAccessoryStatus?: IDeviceAccessoryStatusType;
  deviceType?: IDeviceType;
}

export const defaultValue: Readonly<IDeviceAccessory> = {};
