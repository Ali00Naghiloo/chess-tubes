import { useState } from 'react';
// @mui
import { Grid, IconButton, Paper, Stack, TextField, Tooltip, Typography } from '@mui/material';
// redux
import { useSelector } from '@/redux/store';
// components
import Iconify from '@/components/iconify/Iconify';
// utils
import { enNumToPer } from '@/utils/persianUtils';
// types
import { User } from '@/modules/user/models/user';
//
import ChangeUsernameDialog from './dialogs/ChangeUsernameDialog';
import ChangeEmailDialog from './dialogs/ChangeEmailDialog';
import ChangePasswordDialog from './dialogs/ChangePasswordDialog';
import ChangePhoneDialog from './dialogs/ChangePhoneDialog';

// ----------------------------------------------------------------------

type WhichDialog = null | 'username' | 'password' | 'phone' | 'email';

export default function AccountInfo() {
  //

  const { email, mobile, username } = useSelector((s) => s.user.user) as User;

  const [whichDialog, setWhichDialog] = useState<WhichDialog>(null);

  const handleCloseDialog = () => {
    setWhichDialog(null);
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
        اطلاعات حساب
      </Typography>

      <Grid container columnSpacing={{ sm: 4, md: 8, lg: 10, xs: 3 }} rowSpacing={3}>
        <Grid item xs={12} sm={12 / 2}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <TextField
              InputLabelProps={{ shrink: true }}
              fullWidth
              inputProps={{ readOnly: true }}
              value={username ?? ''}
              size="small"
              label={
                <Stack dir="ltr" direction="row" alignContent="center" justifyContent="center">
                  نام کاربری
                  <Iconify icon="mdi:user" sx={{ mr: 0.4 }} />
                </Stack>
              }
            />
            <Tooltip title="تغییر نام کاربری">
              <IconButton onClick={() => setWhichDialog('username')}>
                <Iconify icon="iconamoon:edit-bold" />
              </IconButton>
            </Tooltip>
          </Stack>
        </Grid>

        <Grid item xs={12} sm={12 / 2}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <TextField
              InputLabelProps={{ shrink: true }}
              fullWidth
              inputProps={{ readOnly: true }}
              value={enNumToPer(mobile)}
              size="small"
              label={
                <Stack dir="ltr" direction="row" alignContent="center" justifyContent="center">
                  شماره تلفن
                  <Iconify icon="eva:smartphone-fill" sx={{ mr: 0.4 }} />
                </Stack>
              }
            />
            <Tooltip title="تغییر شماره موبایل">
              <IconButton onClick={() => setWhichDialog('phone')}>
                <Iconify icon="iconamoon:edit-bold" />
              </IconButton>
            </Tooltip>
          </Stack>
        </Grid>

        <Grid item xs={12} sm={12 / 2}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <TextField
              InputLabelProps={{ shrink: true }}
              fullWidth
              value={email}
              inputProps={{ readOnly: true }}
              size="small"
              label={
                <Stack dir="ltr" direction="row" alignContent="center" justifyContent="center">
                  ایمیل
                  <Iconify icon="ic:baseline-email" sx={{ mr: 0.4 }} />
                </Stack>
              }
            />
            <Tooltip title="تغییر  ایمیل">
              <IconButton onClick={() => setWhichDialog('email')}>
                <Iconify icon="iconamoon:edit-bold" />
              </IconButton>
            </Tooltip>
          </Stack>
        </Grid>

        <Grid item xs={12} sm={12 / 2}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <TextField
              InputLabelProps={{ shrink: true }}
              fullWidth
              inputProps={{ readOnly: true }}
              size="small"
              value={124124}
              type="password"
              label={
                <Stack dir="ltr" direction="row" alignContent="center" justifyContent="center">
                  رمز عبور
                  <Iconify icon="eva:unlock-fill" sx={{ mr: 0.4 }} />
                </Stack>
              }
            />
            <Tooltip title="تغییر  رمز عبور">
              <IconButton onClick={() => setWhichDialog('password')}>
                <Iconify icon="iconamoon:edit-bold" />
              </IconButton>
            </Tooltip>
          </Stack>
        </Grid>
      </Grid>

      <ChangeUsernameDialog handleClose={handleCloseDialog} open={whichDialog === 'username'} />
      <ChangeEmailDialog handleClose={handleCloseDialog} open={whichDialog === 'email'} />
      <ChangePasswordDialog handleClose={handleCloseDialog} open={whichDialog === 'password'} />
      <ChangePhoneDialog handleClose={handleCloseDialog} open={whichDialog === 'phone'} />
    </Paper>
  );
}
