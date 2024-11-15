import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
// @mui
import { Box, Grid } from '@mui/material';
// _mock
import { _appCourses, _appProduct } from '@/_mock/arrays';
// components
import { FavCourseCard, MiniFavCourseCard } from '@/components/course-card';
import { FavMiniShopCard, FavShopCard } from '@/components/shop-card';
import PreLoader from '@/components/pre-loader/PreLoader';
// hook
import useResponsive from '@/hooks/useResponsive';
// utils
import { shuffleArray } from '@/utils/arrayUtils';
// redux
import { useDispatch } from '@/redux/store';
// operators
import getLastSeenItems from '@/modules/global/redux/operators/getLastSeenItems';

// ----------------------------------------------------------------------

export default function RecentlySection() {
  //
  const isMobile = useResponsive('down', 'sm');

  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  const successCallback = () => {
    setIsLoading(false);
  };

  const failureCallback = (msg: string) => {
    toast.error(msg);
    setIsLoading(false);
  };

  useEffect(() => {
    setTimeout(() => {
      dispatch(getLastSeenItems(successCallback, failureCallback));
    }, 2000);
  }, [dispatch]);

  return (
    <Box>
      {isLoading && <PreLoader />}
      {!isLoading && (
        <Grid container spacing={2}>
          {shuffleArray([..._appProduct, ..._appCourses]).map((d) => {
            if (d.type === 'product') {
              return (
                <Grid item xs={12 / 1} sm={12 / 2} key={d.id}>
                  {isMobile ? (
                    <FavMiniShopCard {...d} sx={{ width: '100%' }} />
                  ) : (
                    <FavShopCard {...d} />
                  )}
                </Grid>
              );
            }

            return (
              <Grid item xs={12 / 1} sm={12 / 2} key={d.id}>
                {isMobile ? (
                  <MiniFavCourseCard {...d} sx={{ width: '100%' }} />
                ) : (
                  <FavCourseCard {...d} />
                )}
              </Grid>
            );
          })}
        </Grid>
      )}
    </Box>
  );
}
