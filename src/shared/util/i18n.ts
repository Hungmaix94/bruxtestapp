//@ts-nocheck
import i18n from 'i18next';
import * as Localization from 'expo-localization';

import {initReactI18next} from 'react-i18next';
import en from "../../../i18n/en/index";
import pl from "../../../i18n/pl/index";

const resources = {
    en: {
        app: en
    },
    pl: {
        app: pl
    }

};
const locale = Localization?.locale?.slice(0, 2);

i18n
    .use(initReactI18next)
    .init({
        resources: {
            ...resources
        },
        lng: locale,
        fallbackLng: "en",
        debug: true,
        ns: ["app"],
        defaultNS: 'app',
        fallbackNS: 'app',
        interpolation: {
            escapeValue: false
        }
    });
