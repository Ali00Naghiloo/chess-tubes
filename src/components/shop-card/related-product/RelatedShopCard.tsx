// @mui
import { Box, Link, Stack, Typography, alpha } from '@mui/material';
// utils
import { enNumToPer, enNumToPerPrice } from '@/utils/persianUtils';
import { bgBlur } from '@/utils/cssStyles';
// types
import { ProductCardProps } from '@/modules/product/models/product';
// utils
import { calcDiscount } from '@/utils/priceUtils';
// components
import Image from '@/components/image/';
import SvgColor from '@/components/svg-color/';
// routes
import { PATH_PAGE } from '@/routes/paths';

// ----------------------------------------------------------------------

export type RelatedShopCardProps = ProductCardProps & {};

export default function RelatedShopCard({
  discount,
  id,
  mainImage,
  title,
  price,
  rating,
}: RelatedShopCardProps) {
  //

  return (
    <Box
      dir="ltr"
      sx={{
        minWidth: 180,
        width: 180,
        height: 350,
        position: 'relative',
        cursor: 'pointer',

        px: 1,
        py: 0,
      }}
    >
      <Link href={PATH_PAGE.product(id)} color="inherit" underline="none">
        <Image
          draggable={false}
          alt={title}
          src={PATH_PAGE.productImageUrl(mainImage)}
          style={{ objectFit: 'contain' }}
          sx={{ width: '100%', height: 200, borderRadius: 0.5 }}
        />
        <Box dir="rtl" sx={{ mt: 1.5 }}>
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
              px: 0.5,
            }}
            fontWeight={600}
          >
            {title}
          </Typography>
        </Box>
        <Box sx={{ px: 0.5 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 1 }}>
            <Stack direction="row" sx={{ pt: 1 }}>
              <SvgColor src="/assets/icons/products/ic_toman.svg" sx={{ width: 20, ml: 0.5 }} />
              <Typography variant="subtitle1" fontWeight={600}>
                {enNumToPerPrice(calcDiscount(price, discount?.discountPercent))}
              </Typography>
            </Stack>
            {discount != null && !!discount.discountPercent && (
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{
                  bgcolor: (theme) =>
                    bgBlur({ blur: 20, color: theme.palette.error.main, opacity: 0.9 }),
                  padding: 0.5,
                  color: (theme) => theme.palette.error.contrastText,
                  minWidth: 35,
                  borderRadius: 3,
                }}
              >
                <Typography variant="overline" sx={{ lineHeight: 1 }} fontWeight={900} dir="rtl">
                  {enNumToPer(discount.discountPercent)}%
                </Typography>
              </Stack>
            )}
          </Stack>
          <Stack
            alignItems="flex-start"
            direction="row"
            justifyContent="space-between"
            dir="rtl"
            sx={{ mt: 0.7 }}
          >
            {discount != null && !!discount.discountPercent && (
              <Stack alignItems="flex-end" sx={{ width: '100%' }}>
                <Typography
                  variant="caption"
                  fontWeight={600}
                  sx={{
                    textDecoration: 'line-through rgba(1,1,1,0.3)',
                    color: (theme) => alpha(theme.palette.grey[500], 1),
                    pr: 0,
                  }}
                >
                  {enNumToPerPrice(price)}
                </Typography>
              </Stack>
            )}
          </Stack>
        </Box>
      </Link>
    </Box>
  );
}
