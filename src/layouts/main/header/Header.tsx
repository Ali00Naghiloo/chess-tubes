import { useEffect, useState } from 'react';
// @mui
import {
  Alert,
  AppBar,
  Box,
  Button,
  IconButton,
  InputBase,
  Paper,
  Skeleton,
  Stack,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';
// components
import Iconify from '@/components/iconify/Iconify';
// logo
import Logo from '@/components/logo/Logo';
// routes
import { PATH_AUTH } from '@/routes/paths';
// hooks
import useResponsive from '@/hooks/useResponsive';
// config
import { HEADER } from '@/config-global';
// css utils
import { bgBlur } from '@/utils/cssStyles';
// redux
import { useDispatch, useSelector } from '@/redux/store';
import needToLogin from '@/modules/global/redux/operators/needToLogin';
//
import AccountPopover from './AccountPopover';
import NotificationPopoverPopover from './NotificationPopover';
import CartPopover from './CartPopover';
import Bookmark from './‌Bookmark';
import Search from './Search';
import MenuItem from './MenuItem';
import DarkMode from './DarkMode';

// ----------------------------------------------------------------------

type Props = {
  onOpenNav: VoidFunction;
  onOpenSearch: VoidFunction;
};

export default function Header({ onOpenNav, onOpenSearch }: Props) {
  //
  const { isAuthenticated, isInitialized } = useSelector((s) => s.user);

  const theme = useTheme();

  const isDesktop = useResponsive('up', 'md');

  const isTablet = useResponsive('down', 'md');

  const renderContent = (
    <Stack dir="ltr" sx={{ width: '100%' }} direction="row" justifyContent="space-between">
      {isDesktop && (
        <Paper
          component="form"
          variant="outlined"
          sx={{
            p: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: 350,
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%,-50%)',
          }}
          elevation={0}
        >
          <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
            <Iconify icon="eva:search-fill" />
          </IconButton>
          <InputBase
            onFocus={onOpenSearch}
            dir="rtl"
            sx={{ ml: 1, flex: 1 }}
            placeholder="جست و جو..."
          />
        </Paper>
      )}

      {isTablet ? (
        <Box>
          <MenuItem onClick={onOpenNav} />
          <Search onClick={onOpenSearch} />
        </Box>
      ) : (
        <Logo hideSlogan sx={{ width: { xs: 110, sm: 130 } }} />
      )}

      <Stack flexGrow={1} direction="row" alignItems="center" justifyContent="flex-end">
        {isAuthenticated && (
          <>
            <NotificationPopoverPopover />

            <Bookmark />

            <CartPopover />

            <DarkMode />

            <AccountPopover />
          </>
        )}

        {!isAuthenticated && isInitialized && (
          <Box sx={{ position: 'relative' }}>
            <Button color="green" href={PATH_AUTH.login} variant="contained" disableElevation>
              ورود/ثبت نام
            </Button>

            <MustLoginAlert />
          </Box>
        )}

        {!isAuthenticated && !isInitialized && (
          <Stack direction="row" spacing={1} dir="rtl" alignItems="center">
            <Skeleton animation="wave" variant="circular" width={40} height={40} />
          </Stack>
        )}
      </Stack>
    </Stack>
  );

  return (
    <AppBar
      component="header"
      sx={{
        boxShadow: 'none',
        height: HEADER.H_MOBILE,
        zIndex: theme.zIndex.appBar + 1,
        ...bgBlur({
          color: theme.palette.background.default,
        }),
        transition: theme.transitions.create(['height'], {
          duration: theme.transitions.duration.shorter,
        }),
        ...(isDesktop && {
          width: 1,
          bgcolor: 'background.default',

          height: HEADER.H_DASHBOARD_DESKTOP_OFFSET,
          borderBottom: `dashed 1px ${theme.palette.divider}`,
        }),
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 },
        }}
        // dir="ltr"
      >
        {renderContent}
      </Toolbar>
    </AppBar>
  );
}

// ----------------------------------------------------------------------

function MustLoginAlert() {
  const { needLogin } = useSelector((s) => s.global);

  const [timeout, setTimeout] = useState(5000);

  const dispatch = useDispatch();

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (timeout > 0 && needLogin) {
      const interval = setInterval(() => {
        setTimeout((s) => s - 1000);
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
    if (needLogin) {
      dispatch(needToLogin(false));
      setTimeout(5000);
    }
  }, [timeout, needLogin, dispatch]);

  return (
    <>
      {needLogin && (
        <Paper
          dir="rtl"
          sx={{ position: 'absolute', p: 0, width: 280, top: '100%', left: 0 }}
          elevation={23}
        >
          <Alert severity="error" variant="standard">
            <Typography fontWeight={600}>
              برای اضافه کردن محصولات به سبد خرید و ایجاد دیدگاه باید ابتدا به حساب کاربری خود وارد
              شوید
            </Typography>
          </Alert>
        </Paper>
      )}
    </>
  );
}
