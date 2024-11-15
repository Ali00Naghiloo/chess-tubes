import needToLogin from '@/modules/global/redux/operators/needToLogin';
import { useDispatch, useSelector } from '@/redux/store';

// ----------------------------------------------------------------------

export default function useMustLoggedInAlert() {
  const { isAuthenticated } = useSelector((s) => s.user);

  const dispatch = useDispatch();

  return () => {
    if (!isAuthenticated) {
      dispatch(needToLogin(true));
    }
    return isAuthenticated;
  };
}
