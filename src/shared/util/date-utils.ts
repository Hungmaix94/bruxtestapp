import dayjs from 'dayjs';

import { APP_LOCAL_DATE_FORMAT, APP_LOCAL_DATETIME_FORMAT, APP_LOCAL_DATETIME_FORMAT_Z } from 'app/config/constants';
import * as Constants from 'app/config/constants';
import { useAppSelector } from 'app/config/store';
import moment from 'moment';

export const convertDateTimeFromServer = date => (date ? dayjs(date).format(APP_LOCAL_DATETIME_FORMAT) : null);

export const convertDateTimeToServer = date => (date ? dayjs(date).toDate() : null);

export const displayDefaultDateTime = () => dayjs().startOf('day').format(APP_LOCAL_DATETIME_FORMAT);

export function mapLocalToDateTime(local: string, format: string) {
  if (local === 'pl') {
    switch (format) {
      case Constants.APP_LOCAL_DATE_FORMAT:
        return 'YYYY-MM-DD';
      case Constants.APP_DATE_FORMAT:
        return 'YYYY-MM-DD HH:mm';
      case Constants.APP_TIMESTAMP_FORMAT:
        return 'YYYY-MM-DD HH:mm:ss';

      default:
        return format;
    }
  }

  if (local === 'en') {
    switch (format) {
      case Constants.APP_LOCAL_DATE_FORMAT:
        return 'DD/MM/YY';
      case Constants.APP_DATE_FORMAT:
        return 'DD/MM/YY HH:mm';
      case Constants.APP_TIMESTAMP_FORMAT:
        return 'DD/MM/YY HH:mm:ss';

      default:
        return format;
    }
  }
  return format;
}

export const useLocalToDateTime = (dateFormat = APP_LOCAL_DATE_FORMAT) => {
  const currentLocale = useAppSelector(state => state.locale.currentLocale);

  return mapLocalToDateTime(currentLocale, dateFormat);
};

export const transformDate = date => {
  if (!date) {
    return null;
  }
  return moment(date).toDate();
};
