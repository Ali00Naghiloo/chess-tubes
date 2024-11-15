import { useState } from 'react';
// @mui
import { Box, Button, Divider, Grid, Paper, Stack, Typography } from '@mui/material';
// routes
import { PATH_DASHBOARD, PATH_PAGE } from '@/routes/paths';
// @mui
import { CloudDownloadOutlined, CopyAll, Done } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
// components
import Image from '@/components/image/Image';
// _mock
import { _appCourses } from '@/_mock/arrays';
//
import { CourseIllustration, SuccessPaymentIllustration } from '@/assets/illustrations';
import Link from 'next/link';

// ----------------------------------------------------------------------

const SPOT_PLAYER_APP = [
  {
    id: 1,
    name: 'Windows',
    link: 'https://app.spotplayer.ir/assets/bin/spotplayer/setup.exe',
    image: '/assets/images/home/win.png',
  },
  {
    id: 2,
    name: 'Android',
    link: 'https://app.spotplayer.ir/assets/bin/spotplayer/setup.apk',
    image: '/assets/images/home/android.png',
  },
  {
    id: 3,
    name: 'MacOs',
    link: 'https://app.spotplayer.ir/assets/bin/spotplayer/setup.dmg',
    image: '/assets/images/home/mac.png',
  },
];

// ----------------------------------------------------------------------

export default function Processing() {
  return (
    <Stack spacing={4}>
      <Paper variant="outlined" sx={{ py: 2, px: 4 }}>
        <Stack
          direction={{ md: 'row', xs: 'column-reverse' }}
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack spacing={1} alignItems={{ md: 'flex-start', xs: 'center' }}>
            <Typography variant="h5" color="success.main">
              سفارش شما با موفقیت ثبت گردید !
            </Typography>
            <Stack direction="row" alignItems="center">
              <Typography variant="body2">شماره سفارش :</Typography>
              <Typography fontWeight={600}>۵۱۲۲۳۴۴</Typography>
            </Stack>

            <Button
              href={PATH_DASHBOARD.order('1')}
              variant="contained"
              disableElevation
              size="large"
            >
              پیگیری سفارش
            </Button>
          </Stack>
          <SuccessPaymentIllustration sx={{ width: 150, height: 150 }} />
        </Stack>
      </Paper>

      <Paper variant="outlined" sx={{ py: 2, px: 4 }}>
        <Stack
          direction={{ md: 'row', xs: 'column-reverse' }}
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack spacing={1} alignItems={{ md: 'flex-start', xs: 'center' }}>
            <Typography variant="h5" color="info.main">
              لایسنس دوره های آموزشی خریداری شده
            </Typography>
            <Typography fontWeight={500}>
              از طریق این لایسنس ها میتوانید در اپلیکیشن اسپات پلیر به دوره آموزشی مورد نظر خود
              دسترسی پیدا کنید
            </Typography>
          </Stack>
          <CourseIllustration sx={{ width: 150, height: 150 }} />
        </Stack>

        <Grid container spacing={2} sx={{ mt: 1 }}>
          {_appCourses.slice(0, 2).map((c) => (
            <Grid item key={c.id} sm={6} xs={12}>
              <CourseItem {...c} />
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 2, mb: 4 }} />

        <Stack spacing={1} alignItems="flex-start">
          <Typography fontWeight={500}>
            تمامی دوره های آموزشی خریداری شده به همراه لایسنس آن ها در صفحه دوره های من موجود می
            باشد !
          </Typography>
          <Button
            href={PATH_DASHBOARD.myCourses}
            variant="contained"
            disableElevation
            size="large"
            color="info"
          >
            دوره های آموزشی من
          </Button>
        </Stack>
      </Paper>

      <Paper variant="outlined" sx={{ py: 2, px: 4 }}>
        <Typography sx={{ mb: 2 }} variant="h6">
          اپلیکیشن اسپات پلیر
        </Typography>

        <Typography sx={{ opacity: 0.7 }} fontWeight={500}>
          با توجه به سیستم عامل مورد نظر شما ، اپلیکیشن اسپات پلیر را از طریق لینک های زیر دانلود
          کنید
        </Typography>

        <Stack
          direction={{ sm: 'row', xs: 'column' }}
          alignItems="center"
          justifyContent="space-around"
          spacing={2}
          sx={{ mt: 2 }}
        >
          {SPOT_PLAYER_APP.map((s) => (
            <Link key={s.id} href={s.link}>
              <Stack alignItems="center" spacing={1}>
                <Image src={s.image} alt={s.name} sx={{ width: 80, height: 80, borderRadius: 2 }} />
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <CloudDownloadOutlined fontSize="small" />
                  <Typography variant="body2" fontWeight={600}>
                    نسخه {s.name}
                  </Typography>
                </Stack>
              </Stack>
            </Link>
          ))}
        </Stack>

        <Divider sx={{ my: 2 }} />

        <Stack spacing={1} alignItems="flex-start">
          <Typography fontWeight={600} color="info.main">
            مشکلی پیش آمده؟
          </Typography>
          <Typography fontWeight={500}>
            از طریق لینک زیر میتونید آموزش استفاده از اسپات پلیر را برای تماشای دوره های آموزشی
            مشاهده کنید
          </Typography>
          <Button href={PATH_PAGE.faqs} variant="contained" disableElevation color="info">
            آموزش استفاده از اسپات پلیر
          </Button>
        </Stack>
      </Paper>
    </Stack>
  );
}

// ----------------------------------------------------------------------

type Props = (typeof _appCourses)[number];

function CourseItem({ name, image, id }: Props) {
  //

  const [clipboardState, setClipboardState] = useState({
    isLoading: false,
    isSuccess: false,
  });

  const { isLoading, isSuccess } = clipboardState;

  const copyLicense = async () => {
    setClipboardState({ isLoading: true, isSuccess: false });
    await navigator.clipboard.writeText(id);
    setClipboardState({ isLoading: false, isSuccess: true });
    setTimeout(() => {
      setClipboardState({ isLoading: false, isSuccess: false });
    }, 1000);
  };

  return (
    <Paper variant="outlined" sx={{ p: 1 }}>
      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 1 }}>
          <Box>
            <Image src={image} alt={name} sx={{ height: 100, width: 100, borderRadius: 3 }} />
          </Box>
          <Box>
            <Typography variant="subtitle1">{name}</Typography>
          </Box>
        </Stack>
      </Stack>
      <Stack direction="row" spacing={1}>
        <LoadingButton
          loading={isLoading}
          color={isSuccess ? 'success' : 'inherit'}
          startIcon={isSuccess ? <Done /> : <CopyAll />}
          variant="outlined"
          sx={{ minWidth: 130, opacity: isSuccess ? 1 : 0.5 }}
          onClick={copyLicense}
        >
          کپی لایسنس
        </LoadingButton>

        <Button href={PATH_PAGE.course(1)} variant="outlined" fullWidth>
          ورود به دوره
        </Button>
      </Stack>
    </Paper>
  );
}
