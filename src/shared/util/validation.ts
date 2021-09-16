import { translate } from 'app/shared/layout/Translation/translate';

export const PASSWORD_LENGTH = { MIN: 8, MAX: 50 };

export const onChangePositiveInput = ev => {
  const charCode = ev.which ? ev.which : ev.keyCode;
  return !(charCode > 31 && (charCode < 48 || charCode > 57)) ? true : ev.preventDefault();
};

export const onChangePositiveNegativeNumber = ev => {
  const charCode = ev.which ? ev.which : ev.keyCode;
  if (charCode === 8 || (charCode === 45 && ev.target.value.length === 0)) {
    return true;
  } else if (!(charCode > 31 && (charCode < 48 || charCode > 57)) || (charCode === 46 && ev.target.value.length > 0)) {
    const value = `${ev.target.value}${ev.key}`;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const regex = Math.sign(value);
    const isNumber = !isNaN(regex);
    return isNumber ? true : ev.preventDefault();
  } else ev.preventDefault();
};

export const onChangeNumber = ev => {
  const charCode = ev.which ? ev.which : ev.keyCode;
  if (charCode === 8) {
    return true;
  } else if (!(charCode > 31 && (charCode < 48 || charCode > 57)) || (charCode === 46 && ev.target.value.length > 0)) {
    const value = `${ev.target.value}${ev.key}`;
    const regexDigit = new RegExp('^[0-9]+(\\.([0-9]{1,2})?)?$');
    return regexDigit.test(value) ? true : ev.preventDefault();
  } else ev.preventDefault();
};

export const onKeyPressFlatBuildingNo = ev => {
  const regexDigit = new RegExp('^[a-zA-Z0-9_-]*$');
  return regexDigit.test(ev.key) || ev.key === '/' ? true : ev.preventDefault();
};

export const REQUIRED = () => ({
  required: {
    value: true,
    errorMessage: translate('entity.validation.required'),
  },
});

export const MAX_LENGTH = maxLength => ({
  maxLength: {
    value: maxLength,
    errorMessage: translate('entity.validation.maxlength', { max: maxLength }),
  },
});

export const MIN_LENGTH = minLength => ({
  minLength: {
    value: minLength,
    errorMessage: translate('entity.validation.minlength', { min: minLength }),
  },
});

export const MAX = max => ({
  max: {
    value: max,
    errorMessage: translate('entity.validation.max', { max }),
  },
});

export const MIN = min => ({
  min: {
    value: min,
    errorMessage: translate('entity.validation.min', { min }),
  },
});

export const NUMBER = () => ({
  number: {
    value: true,
    errorMessage: translate('entity.validation.number'),
  },
});

export const EMAIL = () => ({
  email: {
    errorMessage: translate('global.messages.validate.email.invalid'),
  },
});

export function setValidationNoDirect(communicationChannels) {
  const directChannels = communicationChannels.filter(item => item.isDirect === true);
  const directChannelsTranslations = [];
  for (const directChannel of directChannels) {
    directChannelsTranslations.push(translate(`dynamic.dict_communication_channels.${directChannel.enumKey}.itemTranslation`));
  }
  const directChannelsTranslationsString = directChannelsTranslations.join(', ');
  return translate('entity.validation.noDirectChannels', { directChannels: directChannelsTranslationsString });
}
