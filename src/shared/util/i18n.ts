//@ts-nocheck
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from "../../../i18n/en/index";
import pl from "../../../i18n/pl/index";
import {merge} from "lodash";

const resources = {
    en,
    pl
};

export default function i18nFactory(resource = {}, lng = 'en', fallbackLng = 'en'): { i18n?: any, translate?: any } {
    i18n
        .use(initReactI18next)
        .init({
            resources: {
                ...merge(resources, resource)
            },
            lng,
            defaultNS: 'app',
            fallbackNS: 'common',
            interpolation: {
                escapeValue: false
            }
        });
    const t = i18n.t.bind(i18n);
    return {i18n, t};
}
