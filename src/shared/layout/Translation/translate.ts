// @ts-nocheck
import React, {FC, useEffect, useState} from 'react';
import {get} from 'lodash';
import {ITranslateProps} from 'src/shared/layout/Translation/language/translate';
import {TranslatorContext} from 'src/shared/layout/Translation/language/index';

const REACT_ELEMENT = Symbol.for('react.element');

const isFlattenable = value => {
    const type = typeof value;
    return type === 'string' || type === 'number';
};

const flatten = array => {
    if (array.every(isFlattenable)) {
        return array.join('');
    }
    return array;
};

const toTemplate = string => {
    const expressionRe = /{{\s?\w+\s?}}/g;
    const match = string.match(expressionRe) || [];
    return [string.split(expressionRe)].concat(match);
};

const normalizeValue = (value, key) => {
    if (value == null || ['boolean', 'string', 'number'].includes(typeof value)) {
        return value;
    }
    if (value.$$typeof === REACT_ELEMENT) {
        return React.cloneElement(value, {key});
    }
};
/**
 * Adapted from https://github.com/bloodyowl/react-translate
 * licenced under The MIT License (MIT) Copyright (c) 2014 Matthias Le Brun
 */

const render = (string, values) => {
    if (!values || !string) {
        return string;
    }
    const _a = toTemplate(string);
    const parts = _a[0];
    const expressions = _a.slice(1);
    return flatten(
        // @ts-ignore
        parts.reduce((acc, item, index, array) => {
            if (index === array.length - 1) {
                return acc.concat([item]);
            }
            const match = expressions[index] && expressions[index].match(/{{\s?(\w+)\s?}}/);
            const value = match != null ? values[match[1]] : null;
            return acc.concat([item, normalizeValue(value, index)]);
        }, [])
    );
};
/**
 * A dirty find to split non standard keys and find data from json
 * @param obj json object
 * @param path path to find
 * @param placeholder is placeholder
 * @ts-ignore
 */
// @ts-ignore
const deepFindDirty = (obj, path, placeholder) => {
    const paths = path.split('.');
    let current = obj;
    if (placeholder) {
        // dirty fix for placeholders, the json files needs to be corrected
        paths[paths.length - 2] = paths[paths.length - 2] + '.' + paths[paths.length - 1];
        paths.pop();
    }
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < paths.length; ++i) {
        if (current[paths[i]] === undefined) {
            return undefined;
        }
        current = current[paths[i]];
    }
    return current;
};

// @ts-ignore
const showMissingOrDefault = (key, children) => {
    const renderInnerTextForMissingKeys = TranslatorContext.context.renderInnerTextForMissingKeys;
    if (renderInnerTextForMissingKeys && children && ['string', 'object'].includes(typeof children)) {
        return children;
    }
    return /^error./.test(key)
        ? TranslatorContext.context.missingTranslationMsg + '[' + key + ']'
        : doTranslate('error.missingTranslation', {key}, undefined).content;
};
// @ts-ignore
const doTranslate = (key, interpolate, children) => {

    const translationData = TranslatorContext.context.translations;
    const currentLocale = TranslatorContext.context.locale || TranslatorContext.context.defaultLocale;
    // @ts-ignore
    const data = translationData[currentLocale];
    // If there is no translation data, it means it hasn’t loaded yet, so return no content
    if (!Object.keys(translationData).length) {
        return {
            content: null,
        };
    }
    const preRender = data ? get(data, key) || deepFindDirty(data, key, true) : null;
    // @ts-ignore
    const preSanitize = render(preRender, interpolate) || showMissingOrDefault(key, children);

    return {
        content: preSanitize,
        html: false,
    };
};

/**
 * Translates the given key using provided i18n values
 */
interface ITranslateExtendProps extends ITranslateProps {
    className?: string;
}



export default translate = (contentKey: string, interpolate?: any, children?: string | JSX.Element | Array<string | JSX.Element>) => {
    const translation = doTranslate(contentKey, interpolate, children);
    return translation.content;
};
