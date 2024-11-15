export type EditPersonalInfoProps = {
  name?: string;
  gender?: string | number;
  phone?: string | number;
  birthday?: string | number | Date | null;
};

export type ChangePasswordProps = {
  password: string;
};

export type ChangeEmailProps = {
  email: string;
};

export interface IPostNotificationSetting {
  sendemail: 0 | 1;
  sendsms: 0 | 1;
  sendnotife: 0 | 1;
}
