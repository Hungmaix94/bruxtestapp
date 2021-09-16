import locale from './locale';
import authentication from './authentication';
import applicationProfile from './application-profile';

import medCenter from 'src/entities/med-center/medCenter.reducer';
import doctor from 'src/entities/doctor/doctor.reducer';
import patient from 'src/entities/patient/patient.reducer';
import deviceClients from 'src/entities/device-client/device-client.reducer';
import deviceAccessoryClient from 'src/entities/device-accessory-client/device-accessory-client.reducer';
import invoices from 'src/entities/invoice/invoice.reducer';

import clientType from 'src/entities/client-type/client-type.reducer';

import authorityType from 'src/entities/authority-type/authority-type.reducer';

import offerType from 'src/entities/offer-type/offer-type.reducer';

import orderType from 'src/entities/order-type/order-type.reducer';

import deviceAccessoryType from 'src/entities/device-accessory-type/device-accessory-type.reducer';

import genderType from 'src/entities/gender-type/gender-type.reducer';

import client from 'src/entities/client/client.reducer';

import offer from 'src/entities/offer/offer.reducer';

import offerDeviceType from 'src/entities/offer-device-type/offer-device-type.reducer';

import country from 'src/entities/country/country.reducer';

import vatType from 'src/entities/vat-type/vat-type.reducer';

import vat from 'src/entities/vat/vat.reducer';

import deviceAccessoryStatus from 'src/entities/device-accessory-status-type/device-accessory-status-type.reducer';

import deviceStatusType from 'src/entities/device-status-type/device-status-type.reducer';

import clientDeviceStatus from 'src/entities/client-device-status/client-device-status.reducer';

import diseaseType from 'src/entities/disease-type/disease-type.reducer';

import deviceAccessory from 'src/entities/device-accessory/device-accessory.reducer';

import device from 'src/entities/device/device.reducer';

import order from 'src/entities/order/order.reducer';

import orderStatusType from 'src/entities/order-status-type/order-status-type.reducer';

import deviceType from 'src/entities/device-type/device-type.reducer';
import language from 'src/entities/language/language.reducer';
import currency from 'src/entities/currency/currency.reducer';
import translateDictItem from 'src/entities/translate-dict-item/translate-dict-item.reducer';
import providerTransaction from 'src/entities/provider-transaction/provider-transaction.reducer';

const rootReducer = {
    authentication,
    locale,
    applicationProfile,
    doctor,
    patient,
    clientType,
    authorityType,
    offerType,
    orderType,
    deviceAccessoryType,
    genderType,
    client,
    offer,
    offerDeviceType,
    country,
    vatType,
    vat,
    deviceAccessoryStatus,
    deviceStatusType,
    clientDeviceStatus,
    diseaseType,
    deviceAccessory,
    device,
    deviceClients,
    deviceAccessoryClient,
    order,
    invoices,
    orderStatusType,
    medCenter,
    deviceType,
    language,
    currency,
    translateDictItem,
    providerTransaction,
};

export default rootReducer;
