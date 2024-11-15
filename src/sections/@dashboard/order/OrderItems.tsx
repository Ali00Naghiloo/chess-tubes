// next
import Link from 'next/link';
// @mui
import { Box, Container, Divider, Stack, Typography } from '@mui/material';
// utils
import { enNumToPer, enNumToPerPrice } from '@/utils/persianUtils';
// components
import SvgColor from '@/components/svg-color/SvgColor';
import Image from '@/components/image/Image';
// routes
import { PATH_PAGE } from '@/routes/paths';
// models
import { OrderItem } from '@/modules/order/models/order';

// ----------------------------------------------------------------------

type OrderItemProps = {
  items: OrderItem[];
};

export default function OrderItems({ items }: OrderItemProps) {
  return (
    <Stack spacing={4} sx={{ my: 2 }} divider={<Divider />}>
      {items.map((p, i) => (
        <Stack key={p.order_item_id} spacing={2}>
          <Item {...p} />
        </Stack>
      ))}
    </Stack>
  );
}

// ----------------------------------------------------------------------

function Item({
  image,
  itemType,
  item_id,
  quantity,
  sellingDiscount,
  sellingPrice,
  title,
}: OrderItem) {
  return (
    <Link href={itemType === 'product' ? PATH_PAGE.product(item_id) : PATH_PAGE.product(item_id)}>
      <Stack direction="row" spacing={2} component={Container}>
        <Stack alignItems="center" spacing={2}>
          <Image
            src={
              itemType === 'product'
                ? PATH_PAGE.productImageUrl(image)
                : PATH_PAGE.productImageUrl(image)
            }
            alt={title}
            sx={{ width: { sm: 150, xs: 100 }, height: { sm: 150, xs: 100 }, borderRadius: 2 }}
          />
        </Stack>

        <Stack flexGrow={1}>
          <Stack direction="row" alignItems="center" spacing={0.4}>
            <Typography variant="subtitle1">{title}</Typography>
            <Typography sx={{ opacity: 0.6 }} variant="subtitle1">
              ({enNumToPer(quantity)})
            </Typography>
          </Stack>

          <Box sx={{ mt: 2 }}>
            {sellingDiscount != null && sellingDiscount !== 0 && (
              <Stack direction="row" alignItems="center">
                <Typography variant="overline" fontWeight={600} color="error.light">
                  {enNumToPerPrice(sellingDiscount)}
                </Typography>
                <SvgColor
                  src="/assets/icons/products/ic_toman.svg"
                  sx={{ width: 15, mx: 0.5, bgcolor: 'error.light' }}
                />
                <Typography variant="overline" fontWeight={600} color="error.light">
                  تخفیف
                </Typography>
              </Stack>
            )}

            <Stack direction="row">
              <Typography variant="h5" fontWeight={600}>
                {enNumToPerPrice(sellingPrice)}
              </Typography>
              <SvgColor src="/assets/icons/products/ic_toman.svg" sx={{ width: 20, ml: 0.5 }} />
            </Stack>
          </Box>
          <Stack flexGrow={1} justifyContent="flex-end" alignItems="flex-end">
            {/* <Button
              href={PATH_PAGE.product(id, { isSubmitComment: 'show' })}
              color="info"
              startIcon={<AddCommentOutlined fontSize="small" />}
            >
              ثبت نظر
            </Button> */}
          </Stack>
        </Stack>
      </Stack>
    </Link>
  );
}
