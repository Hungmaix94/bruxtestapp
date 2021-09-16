import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { isEmpty } from 'lodash';

export const getUrlParameter = (name: string, search: string): string => {
  const url = new URL(`http://localhost${search}`); // using a dummy url for parsing
  return url.searchParams.get(name) || '';
};

export const sortIcon = (fieldId: string, sort: string, order: string) => {
  if (sort !== fieldId) {
    return <FontAwesomeIcon icon={faSort} className={'sort-icon'} />;
  } else if (order === 'asc') {
    return <FontAwesomeIcon icon={faSortUp} className="text-primary sort-icon" />;
  } else return <FontAwesomeIcon icon={faSortDown} className="text-primary sort-icon" />;
};

export function setDefaultSort(location: string, defaultSort: string, defaultOrder: string) {
  const sortParam = getUrlParameter('sort', location);
  if (isEmpty(sortParam)) {
    return { sort: defaultSort, order: defaultOrder };
  } else return {};
}

export const getSortState = (search: string, itemsPerPage: number) => {
  const pageParam = getUrlParameter('page', search);
  const sortParam = getUrlParameter('sort', search);
  let sort = 'id';
  let order = 'asc';
  let activePage = 1;
  if (pageParam !== '' && !isNaN(parseInt(pageParam, 10))) {
    activePage = parseInt(pageParam, 10);
  }
  if (sortParam !== '') {
    sort = sortParam.split(',')[0];
    order = sortParam.split(',')[1];
  }
  return { itemsPerPage, sort, order, activePage };
};

// With default Sort
export const getSortStateWithDefaultSort = (
  search: string,
  itemsPerPage: number,
  defaultSort: string | undefined,
  defaultOrder: string | undefined
) => {
  const pageParam = getUrlParameter('page', search);
  const sortParam = getUrlParameter('sort', search);
  let activePage = 1;
  if (pageParam !== '' && !isNaN(parseInt(pageParam, 10))) {
    activePage = parseInt(pageParam, 10);
  }
  if (sortParam !== '') return getSortState(search, itemsPerPage);
  else return { itemsPerPage, sort: defaultSort, order: defaultOrder, activePage };
};
