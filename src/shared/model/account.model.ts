export interface IAccount {
  isActive?: boolean;
  id?: any;
  firstName?: string;
  lastName?: string;
  email?: {
    id?: number;
    emailAddress?: string;
    emailType?: string;
  };
  phone?: {
    id?: number;
    sign?: string;
    countryPrefix?: string;
    phoneNumber?: string;
    phoneNumberType?: string;
    phoneType?: string;
  };
  addresses?: any;
  clientTypeId?: number;
  genderTypeId?: number;
  languageId?: number;
  currencyId?: number;
  companyName?: string;
  taxIdNumber?: string;
  companyEmail?: string;
  medCenterIds?: any;
}
export const defaultValue: Readonly<IAccount> = {
  isActive: false,
};
