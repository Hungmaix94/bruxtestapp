import React from 'react';
import Translate, { translate } from 'app/shared/layout/Translation/translate';
import { isEmpty } from 'lodash';

export const getValueFromOptions = (optionList, variableName, isNew, model, setFieldState) => {
  if (!isNew && !isEmpty(optionList)) {
    const elem = optionList.find(item => item.value === model[variableName]);
    setFieldState(prev => ({ ...prev, [variableName]: elem }));
  }
};

export interface IOptionSelected {
  key: string;
  value: string;
  enumKey?: string;
  translateLabel: React.ReactNode;
  label: string;
}
export const getSelectOptions = (list, type) => {
  return (list || []).map(otherEntity => ({
    key: otherEntity.id,
    value: otherEntity.id,
    enumKey: otherEntity?.enumKey,
    translateLabel: <Translate contentKey={`${type}.${otherEntity.value}`} />,
    label: translate(`${type}.${otherEntity.enumKey}`),
  }));
};

export const transformSelectOptions = (list?: any) => {
  return list.map(otherEntity => ({
    id: otherEntity.id,
    key: otherEntity.id,
    value: otherEntity.fullName,
    enumKey: otherEntity?.fullName,
    label: otherEntity.fullName,
  }));
};
export const transformOptions = (list, dictType) => {
  return list.map(otherEntity => ({
    id: otherEntity.id,
    key: otherEntity.id,
    value: otherEntity.id,
    enumKey: otherEntity?.enumKey,
    translateLabel: <Translate contentKey={`dynamic.${dictType}.${otherEntity.enumKey}.itemTranslation`} />,
    label: translate(`dynamic.${dictType}.${otherEntity.enumKey}.itemTranslation`),
  }));
};

export const getOptions = (list, dictType) => {
  return (list || []).map(otherEntity => ({
    id: otherEntity.id,
    key: otherEntity.id,
    value: otherEntity.id,
    enumKey: otherEntity?.enumKey,
    translateLabel: <Translate contentKey={`dynamic.${dictType}.${otherEntity.enumKey}.itemTranslation`} />,
    label: translate(`dynamic.${dictType}.${otherEntity.enumKey}.itemTranslation`),
  }));
};

export const getOptionsForMedCenter = list => {
  return list?.map(otherEntity => ({
    key: otherEntity.id,
    value: otherEntity.id,
    enumKey: otherEntity.companyName,
    label: otherEntity.companyName,
  }));
};

export const getOptionsByName = list => {
  return (list || []).map(otherEntity => ({
    key: otherEntity.id,
    value: otherEntity.id,
    enumKey: otherEntity?.enumKey,
    label: otherEntity.name,
  }));
};

export const getOptionEnumkey = (list, dictType) => {
  return (list || []).map(otherEntity => ({
    key: otherEntity.id,
    value: otherEntity.enumKey,
    translateLabel: <Translate contentKey={`dynamic.${dictType}.${otherEntity.enumKey}.itemTranslation`} />,
    label: translate(`dynamic.${dictType}.${otherEntity.enumKey}.itemTranslation`),
  }));
};

export const getCurrencyOption = list => {
  return (list || []).map(el => {
    return {
      translateLabel: el.currAbbreviation,
      label: el.currAbbreviation,
      value: el.id,
      key: el.id,
    };
  });
};

export const getBooleanOptions = () => [
  {
    key: 'true',
    value: 'true',
    label: translate('global.form.yes'),
  },
  {
    key: 'false',
    value: 'false',
    label: translate('global.form.no'),
  },
];
export const getStatusOptions = () => [
  {
    key: 'true',
    value: 'true',
    label: translate('global.form.active'),
  },
  {
    key: 'false',
    value: 'false',
    label: translate('global.form.inactive'),
  },
];

export const getCurrentOption = (dict, dictType, id) => {
  const findType = dict.find(e => e.id === id);
  return {
    key: id,
    value: id,
    translateLabel: <Translate contentKey={`dynamic.${dictType}.${findType && findType.enumKey}.itemTranslation`} />,
    label: translate(`dynamic.${dictType}.${findType && findType.enumKey}.itemTranslation`),
  };
};

export const monthListOptions = () => {
  const numberList = Array.from({ length: 12 }, (_, i) => i + 1);
  return numberList.map(month => ({ key: month, value: month, label: month }));
};

export interface IOption {
  isHidden?: boolean;
  key?: string | number;
  value: string | number;
  enumKey?: string;
  label?: string | React.ReactNode;
  entity?: any;
}
