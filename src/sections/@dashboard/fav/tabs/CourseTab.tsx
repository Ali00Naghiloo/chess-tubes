import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
// @mui
import { Box, Button, Grid, LinearProgress, Stack } from '@mui/material';
// redux
import { useDispatch, useSelector } from '@/redux/store';
// modules
import getUserFavList from '@/modules/product/redux/operators/getUserFavList';
// components
import EmptyContent from '@/components/empty-content';
import { FavMiniShopCard, FavShopCard } from '@/components/shop-card';
// paths
import { PATH_PAGE } from '@/routes/paths';
// hooks
import useResponsive from '@/hooks/useResponsive';

// ----------------------------------------------------------------------

export default function CourseTab() {
  //

  const isMobile = useResponsive('down', 'sm');

  const { favorites } = useSelector((s) => s.product);

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(getUserFavList(successCallback, failureCallback));
  }, [dispatch]);

  const successCallback = () => {
    setIsLoading(false);
  };

  const failureCallback = (msg: string) => {
    toast.error(msg ?? 'یه مشکلی پیش اومده');
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && (
        <Stack justifyContent="center" sx={{ height: 300, px: { sm: 4, xs: 2 } }}>
          <LinearProgress />
        </Stack>
      )}

      {!isLoading &&
        (favorites.length === 0 ? (
          <Stack>
            <EmptyContent
              title="هیچ کالایی در لیست علاقه مندی های شما وجود ندارد!"
              description="از طریق لیست محصولات می توانید محصولات مورد علاقه خود را به این لیست اضافه کنید"
              action={
                <Button sx={{ mt: 2 }} variant="contained" disableElevation href={PATH_PAGE.shop}>
                  لیست محصولات
                </Button>
              }
            />
          </Stack>
        ) : (
          <Box>
            <Grid container spacing={2}>
              {favorites.map((f) => (
                <Grid item xs={12 / 1} sm={12 / 2} key={f.id}>
                  {isMobile ? (
                    // ! TEMPORARY
                    // @ts-ignore
                    <FavMiniShopCard {...f} sx={{ width: '100%' }} />
                  ) : (
                    // ! TEMPORARY
                    // @ts-ignore
                    <FavShopCard {...f} />
                  )}
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}
    </>
  );
}
