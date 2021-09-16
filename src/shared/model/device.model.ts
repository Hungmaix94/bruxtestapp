import dayjs from 'dayjs';
import { IDeviceStatusType } from 'app/shared/model/device-status-type.model';
import { IOrderType } from 'app/shared/model/order-type.model';

export interface IDevice {
  id?: number;
  seriesNumber?: string;
  orderNumber?: string;
  amount?: number;
  returnReason?: string | null;
  returnDate?: string | null;
  deviceStatusType?: IDeviceStatusType;
  orderType?: IOrderType;
}

export const defaultValue: Readonly<IDevice> = {};
