
const config = {
  VERSION: process.env.VERSION,
};

export default config;


export const AUTHORITIES = {
  SUPER_ADMIN: {
    name: 'Super admin',
    enumKey: 'SUPER_ADMIN',
  },
  SUPERVISOR: {
    name: 'Supervisor',
    enumKey: 'SUPERVISOR',
  },
  ADMIN: 'ROLE_ADMIN',
  USER: 'ROLE_USER',

  ROLE_MED_CENTER_DIRECTOR: {
    name: 'Dyrektor',
    enumKey: 'MED_CENTER_DIRECTOR',
  },
  ROLE_DOCTOR: {
    name: 'Lekarz',
    enumKey: 'DOCTOR',
  },
  ROLE_PATIENT: {
    enumKey: 'PATIENT',
  },
  ROLE_INDIVIDUAL_CLIENT: 'INDIVIDUAL_CLIENT',
};

export const messages = {
  DATA_ERROR_ALERT: 'Internal Error',
};

export const APP_CUSTOM_DATE_FORMAT = 'DD.MM.YYYY';
export const APP_DATE_FORMAT = 'DD/MM/YY HH:mm';
export const APP_TIMESTAMP_FORMAT = 'DD/MM/YY HH:mm:ss';
export const APP_LOCAL_DATE_FORMAT = 'DD/MM/YYYY';
export const APP_LOCAL_DATETIME_FORMAT = 'YYYY-MM-DDTHH:mm';
export const APP_BASIC_DATE_FORMAT = 'yyyy-MM-dd';
export const APP_BASIC_DATE_TEXT_FORMAT = 'YYYY-MM-DD';
export const APP_LOCAL_DATETIME_FORMAT_Z = 'YYYY-MM-DDTHH:mm Z';
export const APP_WHOLE_NUMBER_FORMAT = '0,0';
export const APP_TWO_DIGITS_AFTER_POINT_NUMBER_FORMAT = '0,0.[00]';
export const APP_DATEPICKER_DATE_FORMAT = 'dd/MM/yyyy';

export const DEVICE_STATUS_TYPES = {
  MANUFACTURER_RETURNED: 1,
  ACTIVE: 2,
  INACTIVE: 3,
  BROKEN: 4,
};

export const ORDER_TYPES = {
  SALE: 1,
  RENT: 2,
};

export const OFFER_TYPES = {
  RETAIL_OFFER: 1,
  WHOLESALE_OFFER: 2,
  ACCESSORIES: 3,
  WHOLESALE_SUBSCRIPTION: 4,
};

export const CLIENT_TYPES = {
  MED_CENTER: 1,
  MED_CENTER_DIRECTOR: 2,
  DOCTOR: 3,
  PATIENT: 4,
  INDIVIDUAL_CLIENT: 5,
  MED_CENTER_ADMIN: 6,
  MED_CENTER_ASSISTANT: 7,
  APPLICATION_OWNER: 8,
};

export const GENDER_TYPES = {
  FEMALE: 1,
  MALE: 2,
};

export const ADDRESS_TYPES = {
  PRIVATE: 1,
  BUSINESS: 2,
  OFFICE: 3,
  CORRESPONDENCE: 4,
};
