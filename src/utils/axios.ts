import axios from 'axios';
// config
import { HOST_API_KEY } from '@/config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: HOST_API_KEY });

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.data !== '' && response.data.status == null) {
      response.data.status = true;
    }
    if (response.data && !response.data.status) {
      const err = {
        status: false,
        message: (response && handleErrorMessage(response.data.message)) || 'یه مشکلی پیش اومده',
      };
      return Promise.reject(err);
    }
    return response;
  },
  (error) => {
    const err = {
      status: error.response?.status,
      message:
        (error.response && handleErrorMessage(error.response.data.message)) || 'یه مشکلی پیش اومده',
    };

    return Promise.reject(err);
  }
);

type APIErrorMessage = { [key: string]: string[] } | string;

function handleErrorMessage(err: APIErrorMessage): string {
  if (typeof err === 'string') return err;
  return Object.values(err).flat().join('\n');
}

axiosInstance.defaults.withCredentials = true;

axios.defaults.headers.common['Content-Type'] = 'application/json';

axios.defaults.headers.common.Accept = 'application/json';

export default axiosInstance;

// ----------------------------------------------------------------------

export function setSession(token: string) {
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
}
