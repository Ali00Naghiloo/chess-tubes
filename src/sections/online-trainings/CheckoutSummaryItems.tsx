// @mui
import { Paper, Stack, Typography } from '@mui/material';
// components
import Image from '@/components/image/Image';
import Scrollbar from '@/components/scrollbar/Scrollbar';
import HorizontalScrollbar from '@/components/horizontal-scrollbar';
// utils
// redux
import { useSelector } from '@/redux/store';
// paths
import { PATH_PAGE } from '@/routes/paths';
import { enNumToPerPrice } from '@/utils/persianUtils';

export default function CheckoutSummaryItems() {
  const {
    title,
    mainImage,
    price,
    discount: { discountPercent },
  } = useSelector((s) => s.onlineCourse.course);

  return (
    <Paper variant="outlined" sx={{ py: 2, px: { sm: 2, md: 3, lg: 4, xs: 2 } }}>
      <Typography
        variant="h6"
        sx={{
          mb: 3,
          '&::before': { content: "'•'", color: 'primary.main', mr: 0.5 },
        }}
      >
        خلاصه سفارش
      </Typography>

      <Stack spacing={2} sx={{ mt: 2 }}>
        <Stack>
          <Scrollbar>
            <HorizontalScrollbar disableArrows>
              <Stack
                direction="row"
                spacing={1}
                dir="rtl"
                justifyContent="flex-start"
                sx={{ display: 'inline-flex', width: { lg: '100%', xs: 'inherit' } }}
              >
                <Image
                  alt={title}
                  src={PATH_PAGE.productImageUrl(mainImage)}
                  sx={{ width: 70, height: 70, borderRadius: 2 }}
                />
                <Stack display="flex" flexDirection="column" justifyContent="space-between">
                  <Typography variant="subtitle1">{title}</Typography>
                  <Stack>
                    <Stack direction="row">
                      <Typography variant="subtitle1" fontWeight={600} mr={1}>
                        {enNumToPerPrice(price)}
                      </Typography>
                      {!!discountPercent && (
                        <Typography variant="subtitle2" fontWeight={600} dir="rtl" color="red">
                          با {discountPercent} % تخفیف
                        </Typography>
                      )}
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
            </HorizontalScrollbar>
          </Scrollbar>
        </Stack>
      </Stack>
    </Paper>
  );
}
