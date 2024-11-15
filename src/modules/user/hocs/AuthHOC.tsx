import { useCallback, useEffect } from 'react';
// redux
import { dispatch } from '@/redux/store';
// utils
import { setSession } from '@/utils/axios';
import localStorageAvailable from '@/utils/localStorageAvailable';
//
import { successfulGetUserCart } from '@/modules/cart/redux/actions';
import { cartService } from '@/modules/cart/service';
// services
import { authService, userService } from '../services';
import {
  getUserProfileSuccessful,
  initializingFailure,
  initializingSuccess,
} from '../redux/actions';

// ----------------------------------------------------------------------

type AuthGuardProps = {
  children: React.ReactNode;
};

export default function AuthHOC({ children }: AuthGuardProps) {
  const storageAvailable = localStorageAvailable();

  const initialize = useCallback(async () => {
    try {
      await userService.csrfCookie();

      const token = storageAvailable ? authService.getToken() : '';

      setSession(token as string);

      if (token) {
        const response = await userService.getProfile();

        dispatch(getUserProfileSuccessful(response.data.data));

        dispatch(initializingSuccess());

        const getCartResp = await cartService.getUserCart();
        dispatch(successfulGetUserCart(getCartResp.data.data));
      } else {
        dispatch(initializingFailure());
      }
    } catch (err) {
      dispatch(initializingFailure());
    }
  }, [storageAvailable]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return <>{children}</>;
}
