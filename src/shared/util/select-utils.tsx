//@ts-nocheck
import React from 'react';
import {isEmpty} from 'lodash';

export const getValueFromOptions = (optionList, variableName, isNew, model, setFieldState) => {
    if (!isNew && !isEmpty(optionList)) {
        const elem = optionList.find(item => item.value === model[variableName]);
        setFieldState(prev => ({...prev, [variableName]: elem}));
    }
};

export interface IOptionSelected {
    key: string;
    value: string;
    enumKey?: string;
    translateLabel: React.ReactNode;
    label: string;
}

export const getSelectOptions = (list, type, t) => {
    return (list || []).map(otherEntity => ({
        key: otherEntity.id,
        value: otherEntity.id,
        enumKey: otherEntity?.enumKey,
        translateLabel: t(`${type}.${otherEntity.value}`),
        label: t(`${type}.${otherEntity.enumKey}`),
    }));
};


export const getOptions = (list, dictType, t) => {
    return (list || []).map(otherEntity => ({
        id: otherEntity.id,
        key: otherEntity.id,
        value: otherEntity.id,
        enumKey: otherEntity?.enumKey,
        translateLabel: t(`dynamic:${dictType}.${otherEntity.enumKey}.itemTranslation`),
        label: t(`dynamic:${dictType}.${otherEntity.enumKey}.itemTranslation`),
    }));
};


export const monthListOptions = () => {
    const numberList = Array.from({length: 12}, (_, i) => i + 1);
    return numberList.map(month => ({key: month, value: month, label: month}));
};

export interface IOption {
    isHidden?: boolean;
    key?: string | number;
    value: string | number;
    enumKey?: string;
    label?: string | React.ReactNode;
    entity?: any;
}
