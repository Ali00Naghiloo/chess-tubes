/* eslint-disable import/no-duplicates */
// ----------------------------------------------------------------------

// date-fns
import { getTime, formatDistanceToNow, formatDistance } from 'date-fns';
import { faIR } from 'date-fns/locale';
import { format } from 'date-fns-jalali';

// ----------------------------------------------------------------------

type InputValue = Date | string | number | null;

export function fDatej(date: InputValue) {
  return date != null ? format(new Date(date), 'yyyy/MM/dd') : '';
}

export function fDate(date: InputValue, newFormat?: string) {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'Asia/Tehran',
  };

  // @ts-ignore
  const formatter = new Intl.DateTimeFormat('fa-IR', options);

  const formattedDate = formatter.format(Number(date) * 1000);

  return date ? formattedDate : '';
}

export function fDateTime(date: InputValue, newFormat?: string) {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'Asia/Tehran',
    hour: '2-digit',
    minute: '2-digit',
  };
  // @ts-ignore
  const formatter = new Intl.DateTimeFormat('fa-IR', options);

  const formattedDate = formatter.format(new Date(date as Date));

  return date ? formattedDate : '';
}

export function fTimestamp(date: InputValue) {
  return date ? getTime(new Date(date)) : '';
}

export function fToNow(date: InputValue) {
  return date
    ? formatDistanceToNow(new Date(date), {
        addSuffix: true,
        locale: faIR,
      })
    : '';
}

export function fDistance(date: InputValue) {
  return date
    ? formatDistance(new Date(), date as Date, {
        addSuffix: true,
        locale: faIR,
      })
    : '';
}
