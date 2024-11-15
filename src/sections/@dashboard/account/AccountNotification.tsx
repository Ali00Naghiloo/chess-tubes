import { ChangeEvent, useState } from 'react';
// @mui
import { Checkbox, Divider, FormControlLabel, Paper, Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// redux
import { useSelector } from '@/redux/store';
// operator
import useUser from '@/modules/user/redux/operators/useUser';
// components
import { enqueueSnackbar } from '@/components/snackbar';

// ----------------------------------------------------------------------

export default function AccountNotification() {
  //

  const {
    user,
    loadings: { updateNotificationSettingLoading },
  } = useSelector((s) => s.user);

  const { updateNotificationSetting } = useUser();

  const { sendemail, sendsms } = user?.notificationSetting ?? {};

  const [notificationType, setNotificationType] = useState<any>({
    sendemail: sendemail || 0,
    sendsms: sendsms || 0,
  });

  const handleUpdateNotificationSetting = async () => {
    try {
      await updateNotificationSetting(notificationType);
    } catch (err) {
      enqueueSnackbar({ variant: 'error', message: err.message });
      console.error(err.message);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>, newValue: boolean) => {
    const { name } = event.target;
    setNotificationType((pre: any) => ({ ...pre, [name]: Number(newValue) }));
  };

  return (
    <Paper variant="outlined" sx={{ py: 2, px: { sm: 2, md: 3, lg: 4, xs: 2 } }}>
      <Typography
        variant="h6"
        sx={{
          mb: 2,
          '&::before': { content: "'•'", color: 'primary.main', mr: 0.5 },
        }}
      >
        تنظیمات اعلان ها
      </Typography>
      <Typography variant="body2" color="text.secondary" fontWeight={500} sx={{ px: 1 }}>
        نحوه دریافت اعلان های خود را برای اعلام تخفیف ها یا موجودی ها مشخص کنید
      </Typography>

      <Divider sx={{ my: 1 }} />

      <Stack alignItems="flex-start">
        <FormControlLabel
          label="از طریق ایمیل"
          control={
            <Checkbox
              name="sendemail"
              checked={Boolean(notificationType.sendemail)}
              onChange={handleChange}
            />
          }
        />

        <FormControlLabel
          label="از طریق اس ام اس"
          control={
            <Checkbox
              name="sendsms"
              checked={Boolean(notificationType.sendsms)}
              onChange={handleChange}
            />
          }
        />
      </Stack>

      <Divider sx={{ my: 1 }} />

      <Stack direction="row" alignItems="flex-start" spacing={1}>
        <LoadingButton
          loading={updateNotificationSettingLoading}
          onClick={handleUpdateNotificationSetting}
          disableElevation
          variant="contained"
        >
          بروزرسانی
        </LoadingButton>
      </Stack>
    </Paper>
  );
}
