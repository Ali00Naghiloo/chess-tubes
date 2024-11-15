// @mui
import { Box, IconButton, Stack, Tooltip, Typography } from '@mui/material';
// components
import Iconify from '@/components/iconify/Iconify';
// hooks
import useResponsive from '@/hooks/useResponsive';
// redux
import { useSelector } from '@/redux/store';
// utils
import { enNumToPer } from '@/utils/persianUtils';
import ShareBox from '@/components/share-box';
import { useState } from 'react';

// ----------------------------------------------------------------------

export default function CourseMainHeadInfo() {
  //

  const isMobile = useResponsive('down', 'sm');

  const { title, registeredCount } = useSelector((s) => s.onlineCourse.course);

  const [anchorOrigin, setAnchorOrigin] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorOrigin);

  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems={{ sm: 'center', xs: 'flex-start' }}
      >
        <Stack
          direction={{ sm: 'row', xs: 'column' }}
          alignItems={{ sm: 'center', xs: 'flex-start' }}
          spacing={1.5}
        >
          <Typography variant="h5">{title}</Typography>
          <Stack direction="row" alignItems="center" spacing={1.2}>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <Iconify sx={{ width: 18, height: 18, color: 'orange' }} icon="eva:star-fill" />

              <Typography variant="subtitle1">۴.۸</Typography>

              <Typography variant="caption">(۱۴۲۵)</Typography>
            </Stack>
            {isMobile && (
              <>
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: (theme) => theme.palette.info.main }}
                  >
                    ۱۰
                  </Typography>

                  <Typography variant="body2">دیدگاه کاربران</Typography>
                </Stack>

                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: (theme) => theme.palette.info.main }}
                  >
                    ۲
                  </Typography>

                  <Typography variant="body2">پرسش و پاسخ</Typography>
                </Stack>
              </>
            )}
          </Stack>

          {isMobile && (
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.5 }}>
              <Iconify icon="ic:baseline-people" color="text.secondary" />

              <Typography variant="body2" fontWeight={500} color="text.secondary">
                {enNumToPer(registeredCount)} دانشجو در این دوره شرکت کرده است
              </Typography>
            </Stack>
          )}
        </Stack>

        <Stack direction={{ sm: 'row', xs: 'column-reverse' }} alignItems="center">
          <Tooltip title="اطلاع از تخفیف ها" placement={isMobile ? 'left-end' : 'bottom'}>
            <IconButton>
              <Iconify icon="eva:bell-fill" />
            </IconButton>
          </Tooltip>

          <Tooltip
            title="اشتراک گذاری این دوره آموزشی"
            placement={isMobile ? 'left-end' : 'bottom'}
          >
            <IconButton onClick={(e) => setAnchorOrigin(e.currentTarget)}>
              <Iconify icon="eva:share-fill" />
            </IconButton>
          </Tooltip>

          <Tooltip title="افزودن به علاقه مندی ها" placement={isMobile ? 'left-end' : 'bottom'}>
            <IconButton>
              {/* eva:heart-outline */}

              <Iconify icon="eva:heart-fill" />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>

      <ShareBox open={open} anchorEl={anchorOrigin} onClose={() => setAnchorOrigin(null)} />

      {!isMobile && (
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.5 }}>
          <Iconify icon="ic:baseline-people" color="text.secondary" />

          <Typography variant="body2" fontWeight={500} color="text.secondary">
            {enNumToPer(registeredCount)} دانشجو در این دوره شرکت کرده است
          </Typography>
        </Stack>
      )}
    </Box>
  );
}
