import { useEffect, useState } from 'react';
// next
import { useRouter } from 'next/router';
import { useParams } from 'next/navigation';
// redux
import { useDispatch, useSelector } from '@/redux/store';
// @mui
import { Container, Divider, LinearProgress, Stack, useTheme } from '@mui/material';
// components
import CustomBreadcrumbs from '@/components/custom-breadcrumbs/CustomBreadcrumbs';
// hooks
import useResponsive from '@/hooks/useResponsive';
// paths
import { PATH_PAGE } from '@/routes/paths';
// modules
import getCourse from '@/modules/course/redux/operators/getCourse';
//
import CourseMain from './main/CourseMain';
import CourseSide from './side/CourseSide';
import CourseTabs from './tabs/CourseTabs';
import CourseMiniPricing from './mini/CourseMiniPricing';

// ----------------------------------------------------------------------

const makeBreadCrumbs = (title: string) => [
  { name: 'خانه', href: PATH_PAGE.root },
  { name: 'دوره های آموزشی', href: PATH_PAGE.courses },
  { name: title },
];

export default function CourseSection() {
  const {
    palette: { mode },
  } = useTheme();

  const isMobile = useResponsive('down', 'md');

  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  const { push, isReady } = useRouter();

  const { title } = useSelector((s) => s.course.course);

  const params = useParams();

  const successCallback = () => {
    setIsLoading(false);
  };

  const errorCallback = (err: any) => {
    if (`${err.status}` === '404') {
      push(PATH_PAGE.page404);
    }
  };

  useEffect(() => {
    if (isReady) {
      const courseId = params.course_id;
      dispatch(getCourse(courseId as string, successCallback, errorCallback));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, isReady]);

  return (
    <Container dir="rtl" sx={{ my: 3, mb: 10 }}>
      {isLoading && (
        <Stack justifyContent="center" sx={{ height: 300 }}>
          <LinearProgress />
        </Stack>
      )}
      {!isLoading && (
        <>
          <CustomBreadcrumbs
            links={makeBreadCrumbs(title)}
            sx={{
              backgroundColor: (theme) => theme.palette.grey[mode === 'dark' ? 900 : 100],
              p: 1,
            }}
          />

          <Stack direction="row" justifyContent="space-between" spacing={4}>
            <CourseMain />
            {!isMobile && <CourseSide />}
          </Stack>
          <Divider sx={{ my: 5 }} />
          <CourseTabs />

          {isMobile && <CourseMiniPricing />}
        </>
      )}
    </Container>
  );
}
