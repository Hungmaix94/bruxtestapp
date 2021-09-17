import {useMemo, useEffect} from 'react';
import {getDynamicTranslation, getTranslation} from "../../entities/translate-dict-item/translate-dict-item.reducer";
import {useAppDispatch, useAppSelector} from "../../app/config/hooks";
import {useTranslation} from "react-i18next";
import i18nFactory from "../util/i18n";

export const useLocale = () => {
    const dispatch = useAppDispatch();



    const {i18n} = useTranslation("", {useSuspense: false});
    const locale = i18n.language || "en";

    useEffect(() => {
        if (locale) {
            dispatch(getTranslation(locale));
            dispatch(getDynamicTranslation(locale))
        }

    }, [locale]);


    return locale
};
