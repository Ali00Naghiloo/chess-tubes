import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
// @mui
import { Box, Container, LinearProgress, Stack } from '@mui/material';
// redux
import { useDispatch, useSelector } from '@/redux/store';
// modules
import getHomeBanners from '@/modules/banner/redux/operators/getHomeBanners';
import getPageProducts from '@/modules/product/redux/operators/getPageProducts';
import getStatisticalInfo from '@/modules/global/redux/operators/getStatisticalInfo';
import getPageCourses from '@/modules/course/redux/operators/getPageCourses';
import getPageNews from '@/modules/news/redux/operators/getPageNews';
import getHomeTestimonials from '@/modules/comment/redux/operators/getHomeTestimonials';
// sections
import HomeCarousel from './HomeCarousel';
import HomeSummary from './HomeSummary';
import HomeNewsletter from './HomeNewsletter';
import HomeTestimonials from './HomeTestimonials';
import HomeShop from './HomeShop';
import HomeCourse from './HomeCourse';
import HomeNews from './HomeNews';

// ----------------------------------------------------------------------

export default function HomeSection() {
  const [isLoading, setIsLoading] = useState(true);

  const { homeBanners } = useSelector((s) => s.banner);

  const { homeTestimonials } = useSelector((s) => s.comment);

  const dispatch = useDispatch();

  const successCallback = () => {
    setIsLoading(false);
  };

  const failureCallback = (msg: string) => {
    toast.error(msg);
  };

  useEffect(() => {
    dispatch(getHomeBanners(() => {}, failureCallback));
    dispatch(getStatisticalInfo(() => {}, failureCallback));
    dispatch(getPageProducts('index', () => {}, failureCallback));
    dispatch(getPageCourses('index', successCallback, failureCallback));
    dispatch(getPageNews(() => {}, failureCallback));
    dispatch(getHomeTestimonials(successCallback, failureCallback));

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
          <Stack>
            <HomeCarousel list={homeBanners} />
            <HomeSummary />
          </Stack>
          <Box sx={{ position: 'relative' }}>
            <Container>
              <Stack sx={{ mb: 12, mt: 6 }} spacing={10}>
                <HomeShop />
                <HomeCourse />
              </Stack>
            </Container>
            <HomeNewsletter />
            <Container>
              <Stack sx={{ my: 12 }} spacing={10}>
                <HomeNews />
              </Stack>
            </Container>
          </Box>
          <HomeTestimonials list={homeTestimonials} />
        </>
      )}
    </>
  );
}
