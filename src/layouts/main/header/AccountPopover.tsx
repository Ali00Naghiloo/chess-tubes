import { useState } from 'react';
import { toast } from 'react-toastify';
// next
import { useRouter } from 'next/router';
// components
import { CustomAvatar } from '@/components/custom-avatar';
import MenuPopover from '@/components/menu-popover';
import IconButtonAnimate from '@/components/animate/IconButtonAnimate';
// redux
import { useDispatch, useSelector } from '@/redux/store';
// @mui
import { Box, Divider, ListItemIcon, MenuItem, Stack, Typography, alpha } from '@mui/material';
import SvgColor from '@/components/svg-color/SvgColor';
// routes
import { PATH_DASHBOARD, PATH_PAGE } from '@/routes/paths';
//
import logout from '@/modules/user/redux/operators/logout';

// ----------------------------------------------------------------------

const icon = (name: string): string => `/assets/icons/navbar/${name}.svg`;

const OPTIONS = [
  {
    label: 'خانه',
    linkTo: PATH_PAGE.root,
    icon: icon('ic_home'),
  },
  {
    label: 'حساب کاربری',
    linkTo: PATH_DASHBOARD.root,
    icon: icon('ic_user'),
  },
  {
    label: 'سبد خرید',
    linkTo: PATH_DASHBOARD.cart,
    icon: icon('ic_cart'),
  },
  {
    label: 'سفارشات',
    linkTo: PATH_DASHBOARD.orders,
    icon: icon('ic_orders2'),
  },

  {
    label: 'دوره های من',
    linkTo: PATH_DASHBOARD.myCourses,
    icon: icon('ic_courses'),
  },
  {
    label: 'محصولات مورد علاقه من',
    linkTo: PATH_DASHBOARD.fav,
    icon: icon('ic_fav'),
  },
  {
    label: 'درخواست پشتیبانی',
    linkTo: PATH_DASHBOARD.newTicket,
    icon: icon('ic_request_support'),
  },

  {
    label: 'تنظیمات حساب کاربری',
    linkTo: PATH_DASHBOARD.setting,
    icon: icon('ic_setting'),
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  //

  const { user } = useSelector((s) => s.user);

  const { push } = useRouter();

  const dispatch = useDispatch();

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const handleClickItem = (path: string) => {
    handleClosePopover();
    push(path);
  };

  const successLogoutCallback = () => {
    toast.success('با موفقیت خارج شدید');
    push(PATH_PAGE.root);
  };

  const failureLogoutCallback = () => {
    toast.error('یه مشکلی پیش اومده');
  };

  const handleClickSignout = () => {
    handleClosePopover();
    dispatch(logout(successLogoutCallback, failureLogoutCallback));
  };

  return (
    <>
      <IconButtonAnimate
        onClick={handleOpenPopover}
        size="small"
        sx={{
          p: 0.4,
          bgcolor: (theme) =>
            openPopover
              ? alpha(theme.palette.primary.main, 0.6)
              : alpha(theme.palette.grey[900], 0.1),
          ...(openPopover && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.1),
            },
          }),
        }}
      >
        <CustomAvatar
          sx={{ border: (theme) => `2px solid ${theme.palette.background.default}` }}
          src={
            user?.profileImage.startsWith('http')
              ? user?.profileImage
              : PATH_PAGE.avatarImageUrl(user?.profileImage)
          }
          alt={user?.fullname}
          name={user?.fullname}
        />
      </IconButtonAnimate>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        sx={{
          width: 210,
          p: 0,
          backgroundColor: (theme) => alpha(theme.palette.background.default, 0.85),
          backdropFilter: 'blur(20px)',
        }}
        elevation={2}
        arrow="top-left"
        dir="rtl"
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {user?.fullname}
          </Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {OPTIONS.map((option) => (
            <MenuItem
              sx={{ minHeight: 'auto' }}
              key={option.label}
              onClick={() => handleClickItem(option.linkTo)}
            >
              <ListItemIcon>
                <SvgColor src={option.icon} />
              </ListItemIcon>
              <Typography fontWeight={600} variant="body2">
                {option.label}
              </Typography>
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem sx={{ m: 1 }} onClick={handleClickSignout}>
          <ListItemIcon>
            <SvgColor src={icon('ic_logout')} />
          </ListItemIcon>
          <Typography fontWeight={600} variant="body2">
            خروج از حساب
          </Typography>
        </MenuItem>
      </MenuPopover>
    </>
  );
}
