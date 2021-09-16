// @ts-nocheck
import { setLocale } from 'src/shared/reducers/locale';
import TranslatorContext from "src/shared/layout/Translation/language/translator-context";
import {AsyncStorage} from "react-native";

TranslatorContext.setDefaultLocale('en');
TranslatorContext.setRenderInnerTextForMissingKeys(false);

export const languages: any = {
  en: { name: 'English' },
  pl: { name: 'Polski' },
  // jhipster-needle-i18n-language-key-pipe - JHipster will add/remove languages in this object
};

export const locales = Object.keys(languages).sort();

export const registerLocale = store => {
  store.dispatch(setLocale( AsyncStorage.getItem('locale')|| "en"));
};
