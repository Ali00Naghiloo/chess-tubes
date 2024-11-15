import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
// @mui
import { Container, LinearProgress, Stack } from '@mui/material';
// redux
import { useDispatch, useSelector } from '@/redux/store';
// modules
import getCoursesBanners from '@/modules/banner/redux/operators/getCoursesBanners';
import getPageCourses from '@/modules/course/redux/operators/getPageCourses';
//
import CourseCarousel from './CourseCarousel';
import CourseOffers from './CourseOffers';
import CourseCourses from './CourseCourses';

// ----------------------------------------------------------------------

export default function CourseSection() {
  //

  const [isLoading, setIsLoading] = useState(true);

  const { coursesBanners } = useSelector((s) => s.banner);

  const dispatch = useDispatch();

  const successCallback = () => {
    setIsLoading(false);
  };

  const failureCallback = (msg: string) => {
    toast.error(msg);
  };

  useEffect(() => {
    dispatch(getCoursesBanners(() => {}, failureCallback));
    dispatch(getPageCourses('course', successCallback, failureCallback));
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
          <CourseCarousel list={coursesBanners} />
          <Container dir="rtl" sx={{ my: 7, mb: 10 }}>
            <CourseOffers />
            <CourseCourses />
          </Container>
        </>
      )}
    </>
  );
}
