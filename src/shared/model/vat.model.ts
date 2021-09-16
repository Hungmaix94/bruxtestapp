import dayjs from 'dayjs';
import { IVatType } from 'app/shared/model/vat-type.model';

export interface IVat {
  id?: number;
  vatRate?: number;
  description?: string | null;
  enumKey?: string;
  isActive?: boolean;
  validFrom?: string | null;
  validTo?: string | null;
  vatType?: IVatType;
}

export const defaultValue: Readonly<IVat> = {
  isActive: false,
};
