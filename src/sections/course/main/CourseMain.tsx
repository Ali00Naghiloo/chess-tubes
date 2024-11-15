// @mui
import { Box, Divider, Stack, Tooltip, alpha } from '@mui/material';
// components
import Iconify from '@/components/iconify/Iconify';
import Image from '@/components/image/Image';
// utils
import { bgBlur } from '@/utils/cssStyles';
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
import CourseMainContents from './content/CourseMainContents';

// ----------------------------------------------------------------------

const CONTENT = {
  image: '/assets/images/covers/cover_1.jpg',
  title: 'مسابقه شطرنج حرفه‌ای با استراتژی‌های خلاقانه و تساوی اتفاقی به پایان رسید',
};

// ----------------------------------------------------------------------

export default function CourseMain() {
  const isMobile = useResponsive('down', 'md');

  return (
    <Box sx={{ width: { lg: '100%', xs: '100%' } }}>
      <Box position="relative">
        <Image
          src={CONTENT.image}
          alt={CONTENT.title}
          sx={{ height: { sm: 350, xs: 200 }, borderRadius: 2, mb: 2 }}
        />

        <Box
          sx={{
            position: 'absolute',
            left: 10,
            top: 10,

            '&>*': {
              backgroundColor: (theme) =>
                bgBlur({
                  color: alpha(theme.palette.common.black, 0.2),
                  blur: 20,
                }),
              width: 25,
              height: 25,
              color: (theme) => alpha(theme.palette.common.white, 1),
              p: 0.2,
              borderRadius: '50%',
              ml: 0.4,
            },
          }}
        >
          <Tooltip title="دارای زیرنویس">
            <Iconify icon="tdesign:subtitle" />
          </Tooltip>
          <Tooltip title="دارای دوبله فارسی">
            <Iconify icon="icon-park-solid:voice" />
          </Tooltip>
        </Box>
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

      <CourseMainContents />

      <Divider sx={{ my: 5 }} />

      <CourseMainPricing />
    </Box>
  );
}
