import {useMemo, useEffect} from 'react';
import {getDynamicTranslation, getTranslation} from "../../entities/translate-dict-item/translate-dict-item.reducer";
import {useAppDispatch, useAppSelector} from "../../app/config/store";
import {useTranslation} from "react-i18next";
import i18next from "i18next";
import {isEmpty} from "lodash";

let i = 1;
export const useLocale = () => {
    const dispatch = useAppDispatch();
    const {i18n} = useTranslation();
    const locale = i18n.language || "en";
    const translations = useAppSelector(state => state?.translateDictItem?.translations);
    const dynamic = useAppSelector(state => state?.translateDictItem?.dynamicTranslations);

    useEffect(() => {
        if (locale) {
            dispatch(getTranslation(locale));
            dispatch(getDynamicTranslation(locale))
        }

    }, [locale]);

    useMemo(() => {
        if (!isEmpty(translations) && !isEmpty(dynamic) && locale && i == 1) {
            i++;
            i18next.addResourceBundle(locale, "app", {...translations, dynamic}, true, true);
        }

    }, [translations, dynamic, locale]);

    return locale
};
