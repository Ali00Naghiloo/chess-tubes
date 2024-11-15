// eslint
/* eslint-disable class-methods-use-this */

// ----------------------------------------------------------------------

import axios from '@/utils/axios';
import { UserAddress } from '../models/user';
// dto
import { ChangeEmailProps, EditPersonalInfoProps, IPostNotificationSetting } from '../dtos/user';

// ----------------------------------------------------------------------

export interface IUserService {
  loginOrSignup(phoneNumber: string): Promise<any>;
  resendOtp(phoneNumber: string): Promise<any>;
  csrfCookie(): Promise<any>;
  getProfile(): Promise<any>;

  verifyCode(code: string, mobile: string): Promise<any>;
  loginViaCode(authInput: string, password: string): Promise<any>;
  forgetPassword(authInput: string): Promise<any>;
  resetPasswordVerify(otpCode: string, userInput: string, type: string): Promise<any>;
  resendForgetPasswordOtp(authInput: string): Promise<any>;
  resetPassword(password: string, token: string): Promise<any>;

  getAddresses(): Promise<any>;
  addAddress(address: UserAddress): Promise<any>;
  activeAddress(address: UserAddress): Promise<any>;
  editAddress(address: UserAddress): Promise<any>;
  deleteAddress(addressId: string): Promise<any>;
  getProvinces(): Promise<any>;
  getCitiesOfProvince(provinceId: string | number): Promise<any>;

  editPersonalInfo(personalInfo: EditPersonalInfoProps): Promise<any>;
  editEmail(email: ChangeEmailProps): Promise<any>;
  doEditEmail(email: string, otpCode: string): Promise<any>;
  editUsername(username: string): Promise<any>;

  changePhoneOtp(phoneNumber: string | number): Promise<any>;
  changePhone(otp: string | number, phoneNumber: string | number): Promise<any>;
  myCourses(): Promise<any>;

  changeAvatar(newAvatar: File): Promise<any>;

  subscribeNewsletter(email: string): Promise<any>;
  //

  updateNotificationSetting(data: IPostNotificationSetting): Promise<any>;
}

export class UserService implements IUserService {
  async loginOrSignup(mobile: string): Promise<any> {
    const response = await axios.post('api/otplogin', { mobile });
    return response;
  }

  async csrfCookie(): Promise<any> {
    await axios.get('sanctum/csrf-cookie');
  }

  async getProfile(): Promise<any> {
    const response = await axios.post('api/userData');
    return response;
  }

  async verifyCode(otpCode: string, mobile: string): Promise<any> {
    const response = await axios.post('/api/otpVerify', { mobile, otpCode });
    return response;
  }

  async resendOtp(mobile: string): Promise<any> {
    const response = await axios.post('api/otplogin', { mobile });
    return response;
  }

  async loginViaCode(authInput: string, password: string): Promise<any> {
    const response = await axios.post('/api/login', { authInput, password });
    return response;
  }

  async forgetPassword(authInput: string): Promise<any> {
    const response = await axios.post('/api/forgetPassword', { authInput });
    return response;
  }

  async resetPasswordVerify(otpCode: string, userInput: string, type: string): Promise<any> {
    const response = await axios.post('/api/forgetPasswordVerify', { userInput, type, otpCode });
    return response;
  }

  async resendForgetPasswordOtp(authInput: string): Promise<any> {
    const response = await axios.post('/api/forgetPassword', { authInput });
    return response;
  }

  async resetPassword(password: string, token: string | undefined): Promise<any> {
    const response = await axios.post('/api/changePassword', { password, token });
    return response;
  }

  async resetProfilePass(dto: any): Promise<any> {
    const response = await axios.post('/api/doChangePassword', { ...dto });
    return response;
  }

  async logout(): Promise<any> {
    const response = await axios.post('/api/logout');
    return response;
  }

  // ----------------------------------------------------------------------
  // ADDRESS

  async getAddresses(): Promise<any> {
    const response = await axios.get('api/address', {});
    return response;
  }

  async addAddress(address: UserAddress): Promise<any> {
    const response = await axios.post('api/address', address);
    return response;
  }

  async activeAddress(address: UserAddress): Promise<any> {
    return new Promise((res) => res(true));
  }

  async editAddress(address: UserAddress): Promise<any> {
    const response = await axios.put(`api/address/${address.id}`, address);
    return response;
  }

  async deleteAddress(addressId: string): Promise<any> {
    const response = await axios.delete(`api/address/${addressId}`);
    return response;
  }

  async getProvinces(): Promise<any> {
    const response = await axios.get('/api/province', {
      headers: {
        'Cache-Control': 'public, max-age=86400, must-revalidate',
      },
    });
    return response;
  }

  async getCitiesOfProvince(provinceId: string | number): Promise<any> {
    const response = await axios.get(`/api/city/${provinceId}`, {
      headers: {
        'Cache-Control': 'public, max-age=86400, must-revalidate',
      },
    });
    return response;
  }

  // ----------------------------------------------------------------------

  async editPersonalInfo(personalInfo: EditPersonalInfoProps): Promise<any> {
    const response = await axios.post('/api/editPersonalInfo', personalInfo);
    return response;
  }

  async editEmail(email: ChangeEmailProps): Promise<any> {
    const response = await axios.post('/api/doEditEmail', email);
    return response;
  }

  async doEditEmail(email: string, otpCode: string): Promise<any> {
    const response = await axios.post('/api/editEmail', { email, otpCode });
    return response;
  }

  async editUsername(username: string): Promise<any> {
    const response = await axios.post('/api/doChangeUsername', { username });
    return response;
  }

  async changePhoneOtp(mobile: string | number): Promise<any> {
    const response = await axios.post('/api/editMobile', { mobile });
    return response;
  }

  async changePhone(otpCode: string | number, mobile: string | number): Promise<any> {
    const response = await axios.post('/api/doEditMobile', { mobile, otpCode });
    return response;
  }

  async changeAvatar(userAvatar: File): Promise<any> {
    const formData = new FormData();
    formData.append('userAvatar', userAvatar);
    const response = await axios.post('/api/changeAvatar', formData);
    return response;
  }

  async myCourses(): Promise<any> {
    const response = await axios.post('/api/user/courses');
    return response;
  }

  async subscribeNewsletter(email: string): Promise<any> {
    // const response = await axios.post('/api/');
    // return response;
    return new Promise((res) =>
      setTimeout(() => {
        res({ status: true, message: 'با موفقیت انجام شد' });
      }, 1500)
    );
  }

  updateNotificationSetting(data: IPostNotificationSetting): Promise<any> {
    return new Promise((res) =>
      setTimeout(() => {
        res({ status: true, message: 'با موفقیت انجام شد' });
      }, 1500)
    );
  }
}
