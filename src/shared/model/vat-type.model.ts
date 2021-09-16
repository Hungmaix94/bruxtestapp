import { ICountry } from 'app/shared/model/country.model';

export interface IVatType {
  id?: number;
  name?: string;
  description?: string | null;
  enumKey?: string;
  isActive?: boolean;
  country?: ICountry;
}

export const defaultValue: Readonly<IVatType> = {
  isActive: false,
};
