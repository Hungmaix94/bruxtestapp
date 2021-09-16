import { IUser } from 'app/shared/model/user.model';

export interface IEmail {
  id?: string | number;
  emailAddress?: string;
  isDefault?: boolean;
  emailType?: string;
  clientId?: string | number;
}

export interface IAdministrator {
  id?: string | number;
  firstName?: string;
  lastName?: string;
  email?: IEmail;
  phone?: string;
  addresses?: any;
  clientTypeId?: string | number;
  genderTypeId?: string | number;
  medCenterIds?: number[];
  languageId?: number;
  currencyId?: number;
  companyName?: string;
  taxIdNumber?: number;
  companyEmail?: any;
  questionnaireId?: string | number;
  answers?: any;
}

export interface IAdministratorList {
  id?: string | number;
  adminId?: string | number;
  fullName?: string;
  email?: string;
  phone?: string;
  role?: string | number;
  status?: string | number;
  directorId?: string | number;
}

export const defaultValue: Readonly<IAdministrator> = {
  id: null,
  firstName: '',
  lastName: '',
  email: {
    id: null,
    emailAddress: '',
    isDefault: null,
    emailType: '',
    clientId: null,
  },
  phone: null,
  addresses: null,
  clientTypeId: null,
  genderTypeId: null,
  medCenterIds: [],
  languageId: null,
  currencyId: null,
  companyName: null,
  taxIdNumber: null,
  companyEmail: null,
  questionnaireId: null,
  answers: null,
};
