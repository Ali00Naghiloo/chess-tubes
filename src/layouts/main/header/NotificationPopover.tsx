/* eslint-disable @next/next/no-img-element */

// ----------------------------------------------------------------------

import { useEffect, useState } from 'react';
// @mui
import {
  Box,
  Stack,
  Badge,
  Avatar,
  Tooltip,
  Divider,
  IconButton,
  Typography,
  ListItemText,
  ListItemAvatar,
  ListItemButton,
} from '@mui/material';
// components
import SvgColor from '@/components/svg-color';
import CommentIcon from '@mui/icons-material/Comment';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import PersonIcon from '@mui/icons-material/Person';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { useRouter } from 'next/router';
import EmptyContent from '@/components/empty-content';
import { useDispatch, useSelector } from '@/redux/store';
import getNotifications from '@/modules/notification/redux/operators/getNotifications';
import readNotification from '@/modules/notification/redux/operators/readNotification';
import readAllNotification from '@/modules/notification/redux/operators/readAllNotifications';
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
import { IconButtonAnimate } from '../../../components/animate';
import MenuPopover from '../../../components/menu-popover'; // types
import { Notification, NotificationType } from './types';

// ----------------------------------------------------------------------

export default function NotificationPopover() {
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const notifications = useSelector((s) => s.notification);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNotifications());
  }, [dispatch]);

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const handleMarkAllAsRead = async () => {
    dispatch(readAllNotification());
  };

  return (
    <>
      <Tooltip title="اعلان ها">
        <IconButtonAnimate
          color={openPopover ? 'primary' : 'default'}
          onClick={handleOpenPopover}
          sx={{ width: 40, height: 40, ml: 0.5 }}
        >
          <Badge
            badgeContent={notifications.length}
            color="primary"
            anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
          >
            <SvgColor src="/assets/icons/navbar/ic_notification.svg" />
          </Badge>
        </IconButtonAnimate>
      </Tooltip>

      <MenuPopover
        arrow="top-left"
        open={openPopover}
        onClose={handleClosePopover}
        sx={{ width: 360, p: 0 }}
      >
        <Box dir="rtl" sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">اعلان ها</Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              شما {notifications?.length} پیام خوانده نشده دارید
            </Typography>
          </Box>

          {!!notifications?.length && (
            <Tooltip title=" Mark all as read">
              <IconButton color="primary" onClick={handleMarkAllAsRead}>
                <Iconify icon="eva:done-all-fill" />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Scrollbar dir="rtl" sx={{ height: { xs: 'auto', sm: 350 } }}>
          {notifications.length ? (
            notifications?.map((notification) => (
              <NotificationItem key={notification.id} {...{ notification }} />
            ))
          ) : (
            <EmptyContent title="شما هیچ اعلانی ندارید" />
          )}
        </Scrollbar>

        <Divider sx={{ borderStyle: 'dashed' }} />
      </MenuPopover>
    </>
  );
}

// ----------------------------------------------------------------------

function NotificationItem({
  notification: { title, body, id, type, redirectUrl },
}: {
  notification: Notification;
}) {
  const { push } = useRouter();

  const dispatch = useDispatch();

  const readNotificationHandler = async () => {
    dispatch(readNotification(id));
    push(redirectUrl);
  };

  return (
    <ListItemButton
      sx={{
        py: 1.5,
        px: 2.5,
        mt: '1px',
        bgcolor: 'action.selected',
      }}
      onClick={readNotificationHandler}
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: 'background.neutral' }}>
          <RenderAvatar {...{ type }} />
        </Avatar>
      </ListItemAvatar>

      <ListItemText
        disableTypography
        primary={title}
        secondary={
          <Stack direction="row" sx={{ mt: 0.5, typography: 'caption', color: 'text.disabled' }}>
            <Iconify icon="eva:clock-fill" width={16} sx={{ mr: 0.5 }} />
            <Typography variant="caption">{body}</Typography>
          </Stack>
        }
      />
    </ListItemButton>
  );
}

function RenderAvatar({ type }: { type: NotificationType }) {
  switch (type) {
    case 'comment':
      return <CommentIcon color="primary" />;
    case 'answer':
      return <QuestionMarkIcon color="primary" />;
    case 'user':
      return <PersonIcon color="primary" />;
    case 'question':
      return <QuestionAnswerIcon color="primary" />;
    default:
      return '';
  }
}
