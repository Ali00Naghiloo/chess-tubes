import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
// @mui
import { Container, LinearProgress, Stack } from '@mui/material';
// redux
import { useDispatch, useSelector } from '@/redux/store';
// modules
import getNewsBanners from '@/modules/banner/redux/operators/getNewsBanners';
//
import NewsHeader from './NewsHeader';
import NewsCarousel from './NewsCarousel';
import NewsNew from './NewsNew';

// ----------------------------------------------------------------------

export default function NewsSection() {
  const [isLoading, setIsLoading] = useState(true);

  const { newsBanners } = useSelector((s) => s.banner);

  const dispatch = useDispatch();

  const successCallback = () => {
    setIsLoading(false);
  };

  const failureCallback = (msg: string) => {
    toast.error(msg);
  };

  useEffect(() => {
    dispatch(getNewsBanners(successCallback, failureCallback));

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
        <Container dir="rtl" sx={{ my: 7, mb: 10 }}>
          <NewsHeader />

          <NewsCarousel list={newsBanners} />

          <NewsNew />
        </Container>
      )}
    </>
  );
}
