import { useEffect, useState } from 'react';
// @mui
import { Container, LinearProgress, Stack } from '@mui/material';
// components

import { useParams } from 'next/navigation';
import getCourse from '@/modules/online-course/redux/operators/getCourse';
import { useDispatch } from '@/redux/store';
import useResponsive from '@/hooks/useResponsive';
import CheckoutPaymentType from './CheckoutPaymentType';
import CheckoutDiscountCode from './CheckoutDiscountCode';
import CheckoutSide from './CheckoutSide';
import CheckoutSummaryItems from './CheckoutSummaryItems';
import CheckoutSummary from './CheckoutSummary';

// ----------------------------------------------------------------------

export default function CheckoutSection() {
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCourse(params.id as string, successfulCallback, successfulCallback));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const successfulCallback = () => {
    setIsLoading(false);
  };

  const isDesktop = useResponsive('up', 'md');

  return (
    <Container sx={{ mt: 1 }}>
      {isLoading && (
        <Stack justifyContent="center" sx={{ height: 300 }}>
          <LinearProgress />
        </Stack>
      )}
      {!isLoading && (
        <Stack
          justifyContent="center"
          direction={{ md: 'row', xs: 'column' }}
          spacing={{ md: 2, xs: 4 }}
          dir="rtl"
          sx={{ mb: 10 }}
        >
          <Stack spacing={5} flexGrow={1}>
            <CheckoutSummaryItems />

            <CheckoutPaymentType />

            <CheckoutDiscountCode />
          </Stack>

          <CheckoutSide />
          {!isDesktop && <CheckoutSummary />}
        </Stack>
      )}
    </Container>
  );
}
