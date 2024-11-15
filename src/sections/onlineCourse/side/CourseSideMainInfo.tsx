// @mui
import { Paper, Stack, Typography } from '@mui/material';
// components
import Iconify from '@/components/iconify/Iconify';
// hooks
import useResponsive from '@/hooks/useResponsive';
// redux
import { useSelector } from '@/redux/store';
// utils
import { enNumToPer } from '@/utils/persianUtils';

// ----------------------------------------------------------------------

const createCourseInfo = (language: string, duration: string, buyers: string, teacher: string) => [
  { name: 'نوع دوره', value: 'به صورت ویدیویی', icon: 'majesticons:presentation-play' },
  { name: 'مدت دوره', value: duration, icon: 'mdi:clock' },
  { name: 'تعداد خریداران', value: `${buyers} نفر`, icon: 'ic:baseline-people' },
  { name: 'مدرس', value: teacher, icon: 'ri:presentation-fill' },
];

// ----------------------------------------------------------------------

export default function CourseSideMainInfo() {
  //

  const { language, duration, registeredCount, teacher } = useSelector(
    (s) => s.onlineCourse.course
  );

  const isMobile = useResponsive('down', 'sm');

  return (
    <Paper
      variant={isMobile ? 'elevation' : 'outlined'}
      elevation={0}
      sx={{
        p: { sm: 2, xs: 0 },
      }}
    >
      <Stack spacing={1}>
        {createCourseInfo(
          language,
          duration,
          enNumToPer(registeredCount) as string,
          teacher?.fullname ?? ''
          //
        ).map((c) => (
          <Stack key={c.name} direction="row" alignItems="center" spacing={1}>
            <Iconify icon={c.icon} color="grey.600" />
            <Typography fontWeight={500}> {c.name} : </Typography>

            <Typography fontWeight={600}>{c.value}</Typography>
          </Stack>
        ))}
      </Stack>
    </Paper>
  );
}
