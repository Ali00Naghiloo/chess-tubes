// @mui
import {
  Box,
  Button,
  Link,
  Paper,
  PaperProps,
  Stack,
  Tooltip,
  Typography,
  alpha,
} from '@mui/material';
import { Delete, ShoppingCart, Star } from '@mui/icons-material';
// utils
import { bgBlur } from '@/utils/cssStyles';
// components
import Image from '@/components/image/';
import SvgColor from '@/components/svg-color/';
import Iconify from '@/components/iconify/Iconify';

// ----------------------------------------------------------------------

export type FavCourseCardProps = PaperProps & {
  image: string;
  name: string;
  rating: string;
  teacher: string;
  duration: string;
  participant: string;
  price: string;
  offPrice?: string;
  offPercent?: string;
  isMini?: boolean;
  isDoubled?: boolean;
  isTranslated?: boolean;
};

export default function FavCourseCard({
  image,
  name,
  offPercent,
  offPrice,
  price,
  rating,
  duration,
  participant,
  teacher,
  isMini = false,
  isDoubled = true,
  isTranslated = true,
  sx,
  ...other
}: FavCourseCardProps) {
  return (
    <Paper
      dir="ltr"
      variant="outlined"
      sx={{
        width: '100%',
        position: 'relative',
        cursor: 'pointer',
        ...sx,
      }}
      {...other}
    >
      <Link href="/courses/1" color="inherit" underline="none">
        <Stack direction="column">
          <Box sx={{ p: 2 }}>
            <Image
              alt={name}
              src={image}
              style={{ objectFit: 'contain' }}
              sx={{ width: '100%', height: 200, borderRadius: 2 }}
            />
            <Box
              sx={{
                position: 'absolute',
                left: 10,
                top: 10,

                '&>*': {
                  backgroundColor: (theme) => alpha(theme.palette.common.black, 0.5),

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
          </Box>
          <Stack sx={{ flexGrow: 1 }} justifyContent="space-between">
            <Box dir="rtl" sx={{ mt: 1.5, flexGrow: 1, display: 'flex', alignItems: 'center' }}>
              <Typography
                variant="button"
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: '2',
                  WebkitBoxOrient: 'vertical',
                  height: 37,
                  lineHeight: 1.4,
                  px: 1,
                }}
                fontWeight={600}
              >
                {name}
              </Typography>
            </Box>
            <Box sx={{ px: 2 }}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ mt: 0.9 }}
              >
                <Stack sx={{ height: 75 }}>
                  <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    sx={{ py: 0.1 }}
                  >
                    <Star sx={{ color: 'orange' }} fontSize="small" />
                    <Typography variant="subtitle2" sx={{ opacity: '0.8' }} fontWeight={600}>
                      {rating}
                    </Typography>
                  </Stack>
                  <Stack direction="row">
                    <SvgColor
                      src="/assets/icons/products/ic_toman.svg"
                      sx={{ width: 20, ml: 0.5 }}
                    />
                    <Typography variant="subtitle1" fontWeight={600}>
                      {price}
                    </Typography>
                  </Stack>

                  {offPrice != null && (
                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      sx={{
                        textDecoration: 'line-through rgba(1,1,1,0.3)',
                        color: (theme) => alpha(theme.palette.grey[500], 1),
                        pr: 1,
                      }}
                    >
                      {offPrice}
                    </Typography>
                  )}
                </Stack>

                {offPrice != null && (
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
                      {offPercent}
                    </Typography>
                  </Stack>
                )}
              </Stack>
            </Box>
          </Stack>
        </Stack>
      </Link>
      <Stack direction="row" dir="rtl" sx={{ p: 2 }} spacing={2}>
        <Button
          color="inherit"
          sx={{ opacity: 0.5, px: 2 }}
          variant="outlined"
          startIcon={<Delete />}
        >
          حذف
        </Button>
        <Button startIcon={<ShoppingCart />} variant="outlined" fullWidth>
          اضافه به سبد خرید
        </Button>
      </Stack>
    </Paper>
  );
}
