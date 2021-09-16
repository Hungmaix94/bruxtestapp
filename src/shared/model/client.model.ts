import { IClientType } from 'app/shared/model/client-type.model';
import { IGenderType } from 'app/shared/model/gender-type.model';

export interface IClient {
  id?: number;
  status?: string;
  patientNumber?: string | null;
  dateOfBirth?: string | null;
  companyName?: string | null;
  taxIdNumber?: string | null;
  regon?: string | null;
  pwzNumber?: number | null;
  isActive?: boolean | null;
  clientType?: IClientType;
  genderType?: IGenderType;
}

export const defaultValue: Readonly<IClient> = {
  isActive: false,
};

export interface IAddress {
  id?: string | number;
  city?: string;
  addressType?: string;
  countryId?: number;
  districtId?: number;
}

export interface IEmail {
  id?: string | number;
  emailType?: string;
  emailAddress?: string;
}
export interface IPhone {
  id?: string | number;
  sign?: string;
  countryPrefix?: string | number;
  phoneNumber?: string | number;
  phoneNumberType?: string;
  phoneType?: string;
}

export interface IPatient {
  id?: number;
  firstName?: string;
  lastName?: string;
  patientNumber?: string | null;
  dateOfBirth?: string | null;
  nationality?: string | null;
  clientTypeId?: string | null;
  genderTypeId?: number;
  addresses?: IAddress[];
  emails?: IEmail[];
  phones?: IPhone[];
  clientDiseaseTypes?: any;
  comment?: string;
  diseaseType?: string;
  medCenterId?: string | number;
}
export const defaultPatient: Readonly<IPatient> = {};
