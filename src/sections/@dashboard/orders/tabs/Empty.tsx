// @mui
import { Stack, Typography } from '@mui/material';
//
import EmptyOrderIllustration from '@/assets/illustrations/EmptyOrderIllustration';

// ----------------------------------------------------------------------

export default function Empty() {
  //

  return (
    <Stack spacing={0} justifyContent="center" alignItems="center">
      <EmptyOrderIllustration sx={{ width: 200 }} />
      <Typography fontWeight={500} color="text.secondary">
        هنوز هیچ سفارشی ندارید!
      </Typography>
    </Stack>
  );
}
