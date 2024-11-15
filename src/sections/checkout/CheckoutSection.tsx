import { useEffect, useState } from 'react';
// @mui
import { Button, Container, LinearProgress, Paper, Stack } from '@mui/material';
// components
import EmptyContent from '@/components/empty-content';

// hooks
import useResponsive from '@/hooks/useResponsive';
// redux
import { useDispatch, useSelector } from '@/redux/store';
// modules
import getUserAddresses from '@/modules/user/redux/operators/address/getUserAddresses';
import getShipmentStatus from '@/modules/global/redux/operators/getShipmentStatus';
import getUserCart from '@/modules/cart/redux/operators/getUserCart';
import getShipmentOptions from '@/modules/global/redux/operators/getShipmentOptions';
// paths
import { PATH_PAGE } from '@/routes/paths';
//
import CheckoutAddress from './CheckoutAddress';
import CheckoutPaymentType from './CheckoutPaymentType';
import CheckoutDiscountCode from './CheckoutDiscountCode';
import CheckoutSide from './CheckoutSide';
import CheckoutSummary from './CheckoutSummary';
import CheckoutDeliveryType from './CheckoutDeliveryType';
import CheckoutSummaryItems from './CheckoutSummaryItems';

// ----------------------------------------------------------------------

export default function CheckoutSection() {
  const [isLoading, setIsLoading] = useState(true);

  const { isShipmentNeed } = useSelector((s) => s.global);

  const { cartItems } = useSelector((s) => s.cart);

  const dispatch = useDispatch();

  useEffect(() => {
    getCartData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const successfulCallback = () => {
    setIsLoading(false);
  };

  const successfulGetCartCallback = (data: any) => {
    if (data.cartItems.length === 0) {
      setIsLoading(false);
    } else {
      getCheckoutData();
    }
  };

  const getCartData = () => {
    dispatch(getUserCart(successfulGetCartCallback));
  };

  const getCheckoutData = () => {
    dispatch(getUserAddresses());
    dispatch(getShipmentStatus());
    dispatch(getShipmentOptions(successfulCallback));
  };

  const isDesktop = useResponsive('up', 'md');

  return (
    <Container sx={{ mt: 1 }}>
      {isLoading && (
        <Stack justifyContent="center" sx={{ height: 300 }}>
          <LinearProgress />
        </Stack>
      )}
      {cartItems.length === 0 && !isLoading ? (
        <Paper variant="outlined" sx={{ width: '100%' }}>
          <EmptyContent
            title="سبد خرید شما خالی می باشد !"
            description="از طریق لیست محصولات می توانید محصولات مورد علاقه خود را به سبد خرید اضافه کنید"
            action={
              <Button sx={{ mt: 2 }} variant="contained" disableElevation href={PATH_PAGE.shop}>
                لیست محصولات
              </Button>
            }
          />
        </Paper>
      ) : (
        !isLoading && (
          <Stack
            justifyContent="center"
            direction={{ md: 'row', xs: 'column' }}
            spacing={{ md: 2, xs: 4 }}
            dir="rtl"
            sx={{ mb: 10 }}
          >
            <Stack spacing={5} flexGrow={1}>
              <CheckoutSummaryItems />

              {isShipmentNeed && <CheckoutAddress />}

              {isShipmentNeed && <CheckoutDeliveryType />}

              <CheckoutPaymentType />

              <CheckoutDiscountCode />
            </Stack>

            <CheckoutSide />
            {!isDesktop && <CheckoutSummary />}
          </Stack>
        )
      )}
    </Container>
  );
}
