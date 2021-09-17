import { pickBy } from 'lodash';
import pick from 'lodash/pick';
import { useMemo } from 'react';
/**
 * Removes fields with an 'id' field that equals ''.
 * This function was created to prevent entities to be sent to
 * the server with an empty id and thus resulting in a 500.
 *
 * @param entity Object to clean.
 */
//@ts-ignore
export const cleanEntity = entity => {
  const keysToKeep = Object.keys(entity).filter(k => !(entity[k] instanceof Object) || (entity[k]['id'] !== '' && entity[k]['id'] !== -1));

  return pick(entity, keysToKeep);
};

/**
 * Simply map a list of element to a list a object with the element as id.
 *
 * @param idList Elements to map.
 * @returns The list of objects with mapped ids.
 */
export const mapIdList = (idList: ReadonlyArray<any>) => idList.filter((id: any) => id !== '').map((id: any) => ({ id }));



/**
 * remove elements have null or undefine or '' value in object, without remove elements have 0 value
 * @param obj
 */
//@ts-ignore
export const omitEmpty = obj => pickBy(obj, v => v !== null && v !== undefined && v !== '');


export const round = (number: number) => {
  const numberTmp = Number((Math.abs(number) * 100).toPrecision(15));
  return (Math.round(numberTmp) / 100) * Math.sign(number);
};
