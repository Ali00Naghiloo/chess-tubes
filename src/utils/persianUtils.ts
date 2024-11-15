import { digitsEnToFa, addCommas } from '@persian-tools/persian-tools';

// ----------------------------------------------------------------------

export function enNumToPer(en: string | number) {
  if (en == null) {
    return '';
  }
  return digitsEnToFa(en);
}

export function enNumToPerPrice(en: string | number) {
  if (en == null) {
    return '';
  }

  return digitsEnToFa(addCommas(en));
}

export function timeToPersian(time: string) {
  const [hours, minutes] = time.split(':');

  const hoursPersian = Number(hours)
    .toString()
    .split('')
    .map((digit) => String.fromCharCode(digit.charCodeAt(0) + 1728))
    .join('');

  const minutesPersian = String.fromCharCode(
    ...minutes.split('').map((digit) => digit.charCodeAt(0) + 1728)
  );

  const timePersian = `${hoursPersian} ساعت و ${minutesPersian} دقیقه`;

  return timePersian;
}
