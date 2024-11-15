import { useCallback, useMemo } from 'react';
// redux
import { useDispatch } from '@/redux/store';
// components
import { enqueueSnackbar } from '@/components/snackbar';
// services
import { userService } from '../../services';
// actions
import { failureOperation, startLoading, successOperation } from '../actions';
import { IPostNotificationSetting } from '../../dtos/user';

// ----------------------------------------------------------------------

export default function useUser() {
  const dispatch = useDispatch();

  // ======================================================

  const updateNotificationSetting = useCallback(
    async (data: IPostNotificationSetting) => {
      try {
        dispatch(startLoading('updateNotificationSettingLoading'));

        const response = await userService.updateNotificationSetting(data);

        dispatch(successOperation('updateNotificationSettingLoading'));
        enqueueSnackbar(response?.message || 'با موفقیت انجام شد');
      } catch (err) {
        dispatch(
          failureOperation({ error: err.message, loading: 'updateNotificationSettingLoading' })
        );

        throw new Error(err.message);
      }
    },
    [dispatch]
  );

  // ======================================================

  const memoizedValue = useMemo(() => ({ updateNotificationSetting }), [updateNotificationSetting]);
  return memoizedValue;
}
