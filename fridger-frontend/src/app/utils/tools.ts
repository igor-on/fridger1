import * as moment from 'moment';
import { format } from 'date-fns';

export function convertDateToLocal(date: string | Date): string {
  return moment(date).format('YYYY-MM-DDTHH:mm:ss');
}

export function toLocaleISOString(date: string | Date): string {
  return format(date, "yyyy-MM-dd'T'HH:mm:ss");
}
