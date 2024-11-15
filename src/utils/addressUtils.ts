import { cities } from '@/_mock/assets/cities';
import { provinces } from '@/_mock/assets/provinces';

// ----------------------------------------------------------------------

export const getProvinceName = (provinceId: string | number) =>
  provinces.filter((p) => `${p.id}` === `${provinceId}`)[0].title;

export const getCityName = (provinceId: string | number, cityId: string | number) =>
  cities[provinceId].filter((c: any) => `${c.id}` === `${cityId}`)[0].cityName;
