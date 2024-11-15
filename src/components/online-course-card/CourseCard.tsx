// @mui
import { Box, Link, Paper, PaperProps, Stack, Tooltip, Typography, alpha } from '@mui/material';
import { Star } from '@mui/icons-material';
// utils
import { bgBlur } from '@/utils/cssStyles';
// components
import Image from '@/components/image/';
import SvgColor from '@/components/svg-color/';
import Iconify from '@/components/iconify/Iconify';
// models
import { CourseCardProps } from '@/modules/online-course/models/course';
// paths
import { PATH_PAGE } from '@/routes/paths';
// hooks
import useResponsive from '@/hooks/useResponsive';
// utils
import { enNumToPer, enNumToPerPrice } from '@/utils/persianUtils';
import { calcDiscount } from '@/utils/priceUtils';
import { LoadingButton } from '@mui/lab';
import { useRouter } from 'next/router';

// ----------------------------------------------------------------------

export type CourseProps = PaperProps &
  CourseCardProps & {
    isMini?: boolean;
    sx: any;
  };

export default function CourseCard({
  isMini = false,
  id,
  discount,
  duration,
  mainImage,
  price,
  rating,
  registeredCount,
  teacherName,
  event_status: { title: event_title, value },
  title,
  sx,
}: CourseProps) {
  const isMobile = useResponsive('down', 'sm');

  const { push } = useRouter();

  return (
    <Paper
      dir="ltr"
      variant="outlined"
      sx={{
        width: 250,
        height: isMini ? 400 : 'fit-content',
        cursor: 'pointer',
        '&:hover': { boxShadow: (theme) => theme.shadows[2] },
        ...(sx != null && sx),
      }}
    >
      <Link underline="none" color="inherit" href={PATH_PAGE.onlineCourse(id)}>
        <Image
          alt={title}
          src={PATH_PAGE.productImageUrl(mainImage)}
          style={{ objectFit: 'cover' }}
          sx={{
            width: '100%',
            height: 200,
            borderRadius: 0.5,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            right: 5,
            top: 5,

            '&>*': {
              backgroundColor: (theme) =>
                bgBlur({
                  color: alpha(theme.palette.common.black, 0.2),
                  blur: 20,
                }),
              width: 25,
              height: 25,
              color: (theme) => alpha(theme.palette.common.white, 1),
              p: 0.2,
              borderRadius: '50%',
              ml: 0.4,
            },
          }}
        >
          <Tooltip title="دارای زیرنویس">
            <Iconify icon="tdesign:subtitle" />
          </Tooltip>
          <Tooltip title="دارای دوبله فارسی">
            <Iconify icon="icon-park-solid:voice" />
          </Tooltip>
        </Box>
        <Box dir="rtl" sx={{ mt: 1.5, px: 1 }}>
          <Typography
            variant="button"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: '2',
              WebkitBoxOrient: 'vertical',
              height: 35,
              lineHeight: 1.4,
            }}
            fontWeight={700}
          >
            {title}
          </Typography>
        </Box>

        <Box sx={{ mt: 1, px: 1 }}>
          <Paper variant="outlined" sx={{ px: 0.5, pb: 1 }}>
            <Stack
              justifyContent="space-between"
              sx={{ mt: 1.5, opacity: 0.5 }}
              dir="rtl"
              spacing={0.4}
            >
              {!isMini && (
                <>
                  <Stack direction="row" spacing={1} dir="rtl">
                    <Iconify icon="eva:clock-fill" />
                    <Typography variant="body2" fontWeight={600}>
                      {!isMobile && 'مدت زمان :'} {enNumToPer(duration)}
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} dir="rtl">
                    <Iconify icon="eva:people-fill" />
                    <Typography variant="body2" fontWeight={600}>
                      {enNumToPer(Number(registeredCount))} شرکت کننده
                    </Typography>
                  </Stack>
                </>
              )}

              <Stack direction="row" spacing={1} dir="rtl">
                <Iconify icon="fa-solid:chalkboard-teacher" />
                <Typography variant="body2" fontWeight={600}>
                  {!isMobile && 'مدرس :'} {teacherName ?? 'نامشخص'}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1} dir="rtl">
                <Iconify icon="fa-solid:info-circle" />
                <Typography variant="body2" fontWeight={600}>
                  {!isMobile && 'وضعیت :'} {event_title ?? 'نامشخض'}
                </Typography>
              </Stack>
            </Stack>
          </Paper>

          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 1 }}>
            <Stack direction="row">
              <SvgColor src="/assets/icons/products/ic_toman.svg" sx={{ width: 20, ml: 0.5 }} />
              <Typography variant="subtitle1" fontWeight={600}>
                {enNumToPerPrice(calcDiscount(price, discount))}
              </Typography>
            </Stack>

            <Stack direction="row" justifyContent="flex-start" alignItems="center" sx={{ py: 0.1 }}>
              <Star sx={{ color: 'orange' }} fontSize="small" />
              <Typography variant="subtitle2" sx={{ opacity: '0.8' }} fontWeight={600}>
                {enNumToPer(rating)}
              </Typography>
            </Stack>
          </Stack>

          {!!discount && (
            <Stack direction="row" justifyContent="space-between" dir="rtl" sx={{ mt: 0.7 }}>
              {discount != null && (
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  sx={{
                    bgcolor: (theme) =>
                      bgBlur({ blur: 20, color: theme.palette.error.main, opacity: 0.9 }),
                    padding: 0.5,
                    color: (theme) => theme.palette.error.contrastText,
                    minWidth: 40,
                    borderRadius: 3,
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{ lineHeight: 0.9 }}
                    fontWeight={600}
                    dir="rtl"
                  >
                    {discount} %
                  </Typography>
                </Stack>
              )}

              {discount != null && (
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  sx={{
                    textDecoration: 'line-through rgba(1,1,1,0.3)',
                    color: (theme) => alpha(theme.palette.grey[500], 1),
                    pr: 1,
                  }}
                >
                  {enNumToPerPrice(price)}
                </Typography>
              )}
            </Stack>
          )}
        </Box>
      </Link>

      <Box sx={{ mt: 1, px: 1 }}>
        <LoadingButton
          onClick={() => push(`/online-trainings/${id}`)}
          sx={{ my: 1, display: 'flex', justifyContent: 'space-between' }}
          fullWidth={!isMobile}
          variant="contained"
          disableElevation
          disabled={!(value === 'enrolling')}
          color="newError"
          startIcon={<Iconify icon="bi:cart-plus-fill" sx={{ width: 18, height: 18 }} />}
        >
          خرید دوره
        </LoadingButton>
      </Box>
    </Paper>
  );
}
