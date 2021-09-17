export const SURVEY_MODULE_TRANSLATED_DICTS: ISURVEY_MODULE_TRANSLATED_DICTS = {
    QUESTION_SECTIONS: 'qnr_dict_question_sections',
    ANSWER_TYPES: 'qnr_dict_answer_types',
    QUESTIONNAIRE_TYPES: 'qnr_dict_questionnaire_types',
};

interface ISURVEY_MODULE_TRANSLATED_DICTS {
    QUESTION_SECTIONS?: string,
    ANSWER_TYPES?: string,
    QUESTIONNAIRE_TYPES?: string,
};

export interface ITRANSLATED_DICTS extends ISURVEY_MODULE_TRANSLATED_DICTS {
    LANGUAGES?: string,
    OFFER_TYPES?: string,
    COUNTRIES?: string,
    VAT_TYPES?: string,
    ORDER_TYPES?: string,
    ORDER_STATUS_TYPES?: string,
    MEASURING_DEVICE_TYPES?: string,
    DEVICE_ACCESSORY_STATUS_TYPES?: string,
    DEVICE_ACCESSORY_TYPES?: string,
    DEVICE_STATUS_TYPES?: string,
    DEVICE_TYPES?: string,
    CLIENT_TYPES?: string,
    CLIENT_DEVICE_TYPES?: string,
    CLIENT_ACCESSORIES_TYPES?: string,
    CURRENCIES?: string,
    EMAIL_TYPES?: string,
    PHONE_TYPES?: string,
    PHONE_NUMBER_TYPES?: string,
    DISTRICTS?: string,
    DISEASE_TYPES?: string,
    GENDER_TYPES?: string,
    ROLES?: string,
};

export const TRANSLATED_DICTS: ITRANSLATED_DICTS = {
    LANGUAGES: 'dict_languages',
    OFFER_TYPES: 'dict_offer_types',
    COUNTRIES: 'dict_countries',
    VAT_TYPES: 'dict_vat_types',
    ORDER_TYPES: 'dict_order_types',
    ORDER_STATUS_TYPES: 'dict_order_status_types',
    MEASURING_DEVICE_TYPES: 'device-status-types',
    DEVICE_ACCESSORY_STATUS_TYPES: 'dict_device_accessory_status_types',
    DEVICE_ACCESSORY_TYPES: 'dict_device_accessory_types',
    DEVICE_STATUS_TYPES: 'dict_device_status_types',
    DEVICE_TYPES: 'dict_device_types',
    CLIENT_TYPES: 'dict_client_types',
    CLIENT_DEVICE_TYPES: 'dict_client_device_statuses',
    CLIENT_ACCESSORIES_TYPES: 'dict_client_device_statuses',
    CURRENCIES: 'dict_currencies',
    EMAIL_TYPES: 'dict_email_types',
    PHONE_TYPES: 'dict_phone_types',
    PHONE_NUMBER_TYPES: 'dict_phone_number_types',
    DISTRICTS: 'dict_districts',
    DISEASE_TYPES: 'dict_disease_types',
    GENDER_TYPES: 'dict_gender_types',
    ROLES: 'jhi_authority',
    ...SURVEY_MODULE_TRANSLATED_DICTS,
};

export const OFFER_TYPE_ENUM_KEYS = {
    ACCESSORIES: 'ACCESSORIES',
    RETAIL_OFFER: 'RETAIL_OFFER',
    WHOLESALE_OFFER: 'WHOLESALE_OFFER',
    WHOLESALE_SUBSCRIPTION: 'WHOLESALE_SUBSCRIPTION',
};
