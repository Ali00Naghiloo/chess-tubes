// @mui
import { Link, Paper, Stack, Typography } from '@mui/material';
// components
import Iconify from '@/components/iconify/Iconify';
// hooks
import useResponsive from '@/hooks/useResponsive';
// redux
import { useSelector } from '@/redux/store';
// utils
import { enNumToPer, timeToPersian } from '@/utils/persianUtils';

// ----------------------------------------------------------------------

const createCourseInfo = (language: string, duration: string, buyers: string, teacher: string) => [
  { name: 'نوع دوره', value: 'به صورت ویدیویی', icon: 'majesticons:presentation-play' },
  { name: 'زبان دوره', value: language, icon: 'clarity:language-solid' },
  { name: 'مدت دوره', value: timeToPersian(duration), icon: 'mdi:clock' },
  { name: 'تعداد خریداران', value: `${buyers} نفر`, icon: 'ic:baseline-people' },
  { name: 'مدرس', value: teacher, icon: 'ri:presentation-fill' },
  { name: 'دسترسی به دوره', value: 'مادام العمر', icon: 'solar:key-bold' },
];

// ----------------------------------------------------------------------

export default function CourseSideMainInfo() {
  const { language, duration, studentsCount, teacher } = useSelector((s) => s.course.course);

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
          enNumToPer(studentsCount) as string,
          teacher?.fullname ?? ''
        ).map((c) => (
          <Stack key={c.name} direction="row" alignItems="center" spacing={1}>
            <Iconify icon={c.icon} color="grey.600" />
            <Typography fontWeight={500}> {c.name} : </Typography>

            <Typography fontWeight={600}>{c.value}</Typography>
          </Stack>
        ))}

        <Stack direction="row" alignItems="center" spacing={1}>
          <Iconify icon="fluent:learning-app-20-filled" color="grey.600" />
          <Typography fontWeight={500}> نرم افزار مورد نیاز: </Typography>

          <Link href="https://spotplayer.ir/" fontWeight={600}>
            اسپات پلیر
          </Link>
        </Stack>
      </Stack>
    </Paper>
  );
}
