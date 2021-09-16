//@ts-nocheck
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

export default function(resources, lng = 'vi', fallbackLng = 'en') {
    i18n
        .use(LanguageDetector)
        .use(initReactI18next)
        .init({
            resources,
            lng,
            fallbackLng,
            defaultNS: 'app',
            fallbackNS: 'common',
            interpolation: {
                escapeValue: false
            }
        });
    const t = i18n.t.bind(i18n);
    return { i18n, t };
}
