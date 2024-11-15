export interface User {
  id: string;
  addresses: UserAddress[];
  email: string;
  birthday: string;
  fullname: string;
  gender: string | number;
  mobile: string | number;
  about: string;
  nikname?: string;
  username?: string;
  phone: string | number;
  profileImage: string;
  provinces: Province[];
  cities: { [index: number]: City[] };
  //
  notificationSetting: {
    sendemail: 0 | 1;
    sendsms: 0 | 1;
    sendnotife: 0 | 1;
  };
}

export interface Province {
  id: string | number;
  title: string;
}

export interface City {
  id: string | number;
  cityName: string;
}

export interface UserAddress {
  provinceId: string;
  cityId: string;
  address: string;
  buildingNumber: string;
  unit: string;
  postalCode: string;
  receiverName: string;
  phone: string;
  id?: string;
  isActive: boolean;
}

export type AuthUserType = null | User;
