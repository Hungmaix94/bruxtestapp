import { pickBy } from 'lodash';
import pick from 'lodash/pick';
import { IPaginationBaseState } from 'react-jhipster';
import { useMemo } from 'react';
import { useAppSelector } from 'app/config/store';
import { getSelectOptions } from 'app/shared/util/select-utils';

/**
 * Removes fields with an 'id' field that equals ''.
 * This function was created to prevent entities to be sent to
 * the server with an empty id and thus resulting in a 500.
 *
 * @param entity Object to clean.
 */
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

export const overridePaginationStateWithQueryParams = (paginationBaseState: IPaginationBaseState, locationSearch: string) => {
  const params = new URLSearchParams(locationSearch);
  const page = params.get('page');
  const sort = params.get('sort');
  if (page && sort) {
    const sortSplit = sort.split(',');
    paginationBaseState.activePage = +page;
    paginationBaseState.sort = sortSplit[0];
    paginationBaseState.order = sortSplit[1];
  }
  return paginationBaseState;
};

/**
 * remove elements have null or undefine or '' value in object, without remove elements have 0 value
 * @param obj
 */
export const omitEmpty = obj => pickBy(obj, v => v !== null && v !== undefined && v !== '');

// // With default Sort
// export const getSortStateWithDefaultSort = (search: string, itemsPerPage: number, defaultSort: string | undefined, defaultOrder: string | undefined) => {
//   const pageParam = getUrlParameter('page',search);
//   const sortParam = getUrlParameter('sort', search);
//   let activePage = 1;
//   if (pageParam !== '' && !isNaN(parseInt(pageParam, 10))) {
//     activePage = parseInt(pageParam, 10);
//   }
//   if (sortParam !== '') return getSortState(search, itemsPerPage)
//   else return { itemsPerPage, sort: defaultSort, order: defaultOrder, activePage };
// };

export const round = (number: number) => {
  const numberTmp = Number((Math.abs(number) * 100).toPrecision(15));
  return (Math.round(numberTmp) / 100) * Math.sign(number);
};
