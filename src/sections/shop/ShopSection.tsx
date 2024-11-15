import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
// @mui
import { Container, LinearProgress, Stack } from '@mui/material';
// redux
import { useDispatch, useSelector } from '@/redux/store';
// modules
import getPageProducts from '@/modules/product/redux/operators/getPageProducts';
import getShopBanner from '@/modules/banner/redux/operators/getShopBanner';
//
import ShopOffers from './ShopOffers';
import ShopProducts from './ShopProducts';
import ShopCarousel from './ShopCarousel';

// ----------------------------------------------------------------------

export default function ShopSection() {
  //

  const [isLoading, setIsLoading] = useState(true);

  const { shopBanners } = useSelector((s) => s.banner);

  const dispatch = useDispatch();

  const successCallback = () => {
    setIsLoading(false);
  };

  const failureCallback = (msg: string) => {
    toast.error(msg);
  };

  useEffect(() => {
    dispatch(getShopBanner(() => {}, failureCallback));
    dispatch(getPageProducts('shop', successCallback, failureCallback));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <>
      {isLoading && (
        <Container>
          <Stack justifyContent="center" sx={{ height: 300 }}>
            <LinearProgress />
          </Stack>
        </Container>
      )}
      {!isLoading && (
        <>
          <ShopCarousel list={shopBanners} />
          <Container dir="rtl" sx={{ my: 7, mb: 10 }}>
            <ShopOffers />
            <ShopProducts />
          </Container>
        </>
      )}
    </>
  );
}
