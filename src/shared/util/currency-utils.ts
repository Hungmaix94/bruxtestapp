import * as Localization from 'expo-localization';

const formatCurrency = (amount: number, locale = Localization.locale) => {
    return amount.toLocaleString(locale)
}

export default formatCurrency;
