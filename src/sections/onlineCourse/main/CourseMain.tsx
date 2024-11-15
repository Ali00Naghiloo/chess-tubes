// @mui
import { Box, Divider, Stack } from '@mui/material';
// components
import Image from '@/components/image/Image';
// utils
// hooks
import useResponsive from '@/hooks/useResponsive';
//
import CourseMainHeadInfo from './CourseMainHeadInfo';
import CourseMainDescription from './CourseMainDescription';
import CourseMainPricing from './CourseMainPricing';
import CourseSideMainInfo from '../side/CourseSideMainInfo';
import CourseSideTeacherInfo from '../side/CourseSideTeacherInfo';
import CourseSideTranslatorInfo from '../side/CourseSideTranslatorInfo';
import CourseSideDoublerInfo from '../side/CourseSideDoublerInfo';

// ----------------------------------------------------------------------

const CONTENT = {
  image: '/assets/images/covers/cover_1.jpg',
  title: 'مسابقه شطرنج حرفه‌ای با استراتژی‌های خلاقانه و تساوی اتفاقی به پایان رسید',
};

// ----------------------------------------------------------------------

export default function CourseMain() {
  //

  const isMobile = useResponsive('down', 'md');

  return (
    <Box sx={{ width: { lg: '100%', xs: '100%' } }}>
      <Box position="relative">
        <Image
          src={CONTENT.image}
          alt={CONTENT.title}
          sx={{ height: { sm: 350, xs: 200 }, borderRadius: 2, mb: 2 }}
        />
      </Box>

      <CourseMainHeadInfo />

      <Divider sx={{ my: 3 }} />

      <CourseMainDescription />

      {isMobile && (
        <>
          <Divider sx={{ my: 5 }} />
          <Stack spacing={5}>
            <CourseSideMainInfo />
            <Divider sx={{ my: 5 }} />
            <CourseSideTeacherInfo />
            <CourseSideTranslatorInfo />
            <CourseSideDoublerInfo />
          </Stack>
        </>
      )}
      <Divider sx={{ my: 5 }} />

      <CourseMainPricing />
    </Box>
  );
}
