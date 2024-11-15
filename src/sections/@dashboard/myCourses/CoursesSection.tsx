import { useEffect, useState } from 'react';
// @mui
import { Badge, Box, Button, Grid, LinearProgress, Paper, Stack, Typography } from '@mui/material';
import { CopyAll, Done } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
// components
import Image from '@/components/image/Image';
// routes
import { PATH_PAGE } from '@/routes/paths';
// _mock
import { dispatch } from '@/redux/store';
import myCourse from '@/modules/user/redux/operators/myCourses';
import EmptyContent from '@/components/empty-content';

// ----------------------------------------------------------------------
interface myCoursesType {
  orderId: number;
  licenseKey: string;
  content: { course: string[]; chapters: string[]; sections: string[] };
  course: { image: string; title: string; courseId: number };
}

export default function CoursesSection() {
  //
  const [isLoading, setIsLoading] = useState(true);
  const [myCourses, setMyCourses] = useState<myCoursesType[]>([]);

  const successCallback = (response: any) => {
    setMyCourses(response);
    setIsLoading(false);
  };

  useEffect(() => {
    dispatch(myCourse(successCallback));
  }, []);

  return (
    <>
      {isLoading && (
        <Stack justifyContent="center" sx={{ height: 300 }}>
          <LinearProgress />
        </Stack>
      )}
      {!isLoading && myCourses.length === 0 ? (
        <Stack>
          <EmptyContent title="هیچ دوره ای در لیست دوره های شما وجود ندارد!" />
        </Stack>
      ) : (
        <Grid container spacing={2}>
          {myCourses.map((c) => (
            <Grid item key={c.orderId} sm={6} xs={12}>
              <CourseItem {...c} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
}

// ----------------------------------------------------------------------

function CourseItem({ orderId, licenseKey, course, content }: myCoursesType) {
  //

  const [clipboardState, setClipboardState] = useState({
    isLoading: false,
    isSuccess: false,
  });

  const { isLoading, isSuccess } = clipboardState;

  const copyLicense = async () => {
    setClipboardState({ isLoading: true, isSuccess: false });
    await navigator.clipboard.writeText(licenseKey);
    setClipboardState({ isLoading: false, isSuccess: true });
    setTimeout(() => {
      setClipboardState({ isLoading: false, isSuccess: false });
    }, 1000);
  };

  return (
    <Paper variant="outlined" sx={{ p: 1 }}>
      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 1 }}>
          <Box>
            <Image
              src={course.image}
              alt={course.image}
              sx={{ height: 100, width: 100, borderRadius: 3 }}
            />
          </Box>
          <Box>
            <Typography variant="subtitle1">{course.title}</Typography>
          </Box>
        </Stack>
      </Stack>
      <Stack
        alignItems="right"
        spacing={0.5}
        sx={{
          mb: 2,
          span: {
            position: 'relative',
            '.MuiBadge-badge': { transform: 'scale(1) translate(-0%, -0%)' },
          },
        }}
      >
        {content.course &&
          content.course.map((crs, index) => (
            <Badge key={index} badgeContent={crs} color="primary" />
          ))}
        {content.chapters &&
          content.chapters.map((chapter, index) => (
            <Badge key={index} badgeContent={chapter} color="primary" />
          ))}
        {content.sections &&
          content.sections.map((section, index) => (
            <Badge key={index} badgeContent={section} color="primary" />
          ))}
      </Stack>
      <Stack direction="row" spacing={1}>
        <LoadingButton
          loading={isLoading}
          color={isSuccess ? 'success' : 'inherit'}
          startIcon={isSuccess ? <Done /> : <CopyAll />}
          variant="outlined"
          sx={{ minWidth: 130, opacity: isSuccess ? 1 : 0.5 }}
          onClick={copyLicense}
        >
          کپی لایسنس
        </LoadingButton>

        <Button href={PATH_PAGE.course(course.courseId)} variant="outlined" fullWidth>
          ورود به دوره
        </Button>
      </Stack>
    </Paper>
  );
}
