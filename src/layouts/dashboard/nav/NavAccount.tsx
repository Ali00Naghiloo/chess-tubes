import { useState } from 'react';
import { toast } from 'react-toastify';
// @mui
import { Box, Typography } from '@mui/material';
// components
import { UploadAvatar } from '@/components/upload';
// redux
import { useDispatch, useSelector } from '@/redux/store';
// types
import { User } from '@/modules/user/models/user';
// routes
import { PATH_PAGE } from '@/routes/paths';
//
import changeAvatar from '@/modules/user/redux/operators/changeAvatar';

// ----------------------------------------------------------------------

export default function NavAccount() {
  //
  const { profileImage, fullname } = useSelector((s) => s.user.user) as User;

  const [error, setError] = useState(false);

  const dispatch = useDispatch();

  const successCallback = (msg: string) => {
    toast.success(msg ?? 'با موفقیت تغییر یافت');
  };

  const failureCallback = (msg: string) => {
    toast.error(msg ?? 'مشکلی پیش‌ آمده');
    setError(true);
  };

  const updateAvatar = (avatar: File[]) => {
    setError(false);
    if (avatar[0] != null) {
      dispatch(changeAvatar(avatar[0], successCallback, failureCallback));
    }
  };

  return (
    <Box>
      <UploadAvatar
        accept={{
          'image/*': [],
        }}
        error={error}
        sx={{
          width: 100,
          height: 100,
        }}
        file={
          profileImage.startsWith('http') ? profileImage : PATH_PAGE.avatarImageUrl(profileImage)
        }
        maxSize={250000}
        onDrop={updateAvatar}
        helperText={
          <Typography
            variant="body2"
            fontWeight={600}
            sx={{
              mt: 1,
              mx: 'auto',
              display: 'block',
              textAlign: 'center',
              color: 'text.secondary',
            }}
          >
            {fullname}
          </Typography>
        }
      />
    </Box>
  );
}
