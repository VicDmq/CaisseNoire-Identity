// @flow
import moment from 'moment';

export const API_DATE_FORMAT: string = 'YYYY-MM-DD';

export const IDENTITY_DATE_FORMAT: string = 'dddd D MMMM';

const format = (date: string, format: string = IDENTITY_DATE_FORMAT): string => {
  return moment(date, API_DATE_FORMAT).format(format);
};

export default format;
