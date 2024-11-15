import { useEffect, useState } from 'react';
// @mui
import { Button, Container, LinearProgress, Paper, Stack } from '@mui/material';
// redux
import { useDispatch, useSelector } from '@/redux/store';
// component
import EmptyContent from '@/components/empty-content';
// hooks
import useResponsive from '@/hooks/useResponsive';
// routes
import { PATH_PAGE } from '@/routes/paths';
// modules
import getUserCart from '@/modules/cart/redux/operators/getUserCart';
//
import CartSide from './CartSide';
import CartItems from './CartItems';
import CartSummary from './CartSummary';

// ----------------------------------------------------------------------

export default function CartSection() {
  //

  const isDesktop = useResponsive('up', 'md');

  const { totalCount } = useSelector((s) => s.cart);

  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  const successCallback = () => {
    setIsLoading(false);
  };

  const errorCallback = (err: any) => {
    setIsLoading(false);
  };

  useEffect(() => {
    dispatch(getUserCart(successCallback, errorCallback));
  }, [dispatch]);

  return (
    <Container sx={{ mt: totalCount === 0 ? 5 : 0 }}>
      {isLoading && (
        <Stack justifyContent="center" sx={{ height: 400 }}>
          <LinearProgress />
        </Stack>
      )}

      {!isLoading &&
        (totalCount === 0 ? (
          <Paper variant="outlined" sx={{ width: '100%' }}>
            <EmptyContent
              title="سبد خرید شما خالی می باشد !"
              description="از طریق لیست محصولات می توانید محصولات مورد علاقه خود را به سبد خرید اضافه کنید"
              action={
                <Button
                  sx={{ mt: 2 }}
                  // color="info"
                  variant="contained"
                  disableElevation
                  href={PATH_PAGE.shop}
                >
                  لیست محصولات
                </Button>
              }
            />
          </Paper>
        ) : (
          <Stack
            justifyContent="center"
            direction="row"
            spacing={{ md: 2, xs: 0 }}
            dir="rtl"
            sx={{ mb: 10 }}
          >
            <CartItems />

            {isDesktop && <CartSide />}
            {!isDesktop && <CartSummary />}
          </Stack>
        ))}
    </Container>
  );
}
