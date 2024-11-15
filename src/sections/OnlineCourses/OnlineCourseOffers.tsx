// @mui
import { Box, Button, Stack, Typography } from '@mui/material';
// components
import Iconify from '@/components/iconify/Iconify';
import Scrollbar from '@/components/scrollbar/Scrollbar';
import OfferCourseCard from '@/components/online-course-card/offer-course/OfferCourseCard';
// hooks
import useResponsive from '@/hooks/useResponsive';
// icons
import ChessLearningIcon from '@/assets/icons/ChessLearningIcon';
// redux
import { useSelector } from '@/redux/store';

// ----------------------------------------------------------------------

export default function CourseOffers() {
  //

  const isMobile = useResponsive('down', 'sm');

  const { pageCourses } = useSelector((s) => s.onlineCourse);

  return (
    <Box
      sx={{
        width: '100%',
        overflow: 'hidden',
        display: { xs: 'block', sm: 'flex' },
        alignItems: 'flex-end',
        pt: 1,
        bgcolor: (t) =>
          t.palette.mode === 'dark' ? t.palette.primary.dark : t.palette.primary.light,
        borderRadius: 5,
      }}
    >
      {isMobile && (
        <Stack direction="row" justifyContent="space-between" sx={{ mb: 1.5 }}>
          <Stack direction="row" alignItems="center">
            <ChessLearningIcon sx={{ width: 50, height: 50 }} />
            <Typography variant="h6" fontWeight={700}>
              دوره های پرطرفدار
            </Typography>
          </Stack>
          <Button
            sx={{ mb: 1 }}
            color="inherit"
            endIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
          >
            مشاهده همه
          </Button>
        </Stack>
      )}
      <Stack sx={{ overflow: 'hidden', mb: 1 }}>
        <Scrollbar>
          <Stack direction="row" spacing={1} sx={{ height: '100%' }} alignItems="center">
            {!isMobile && (
              <Stack
                sx={{ width: 250, height: '100%', pl: 3 }}
                alignItems="center"
                spacing={5}
                justifyContent="space-between"
              >
                <Typography
                  sx={{ color: (theme) => theme.palette.darkPrimary.main }}
                  variant="h4"
                  textAlign="center"
                  fontWeight={900}
                >
                  دوره‌های آنلاین‌پرطرفدار
                  <br /> چس تیوبز
                </Typography>
                <Stack direction="row">
                  <ChessLearningIcon sx={{ width: 100, height: 100 }} />
                </Stack>
                <Button
                  sx={{ mt: 2, whiteSpace: 'nowrap' }}
                  color="inherit"
                  endIcon={
                    <Iconify
                      sx={{
                        bgcolor: (theme) => theme.palette.darkPrimary.main,
                        color: (theme) => theme.palette.primary.contrastText,
                        width: 20,
                        height: 20,
                        borderRadius: 1,
                        p: 0.1,
                      }}
                      icon="eva:arrow-back-fill"
                    />
                  }
                >
                  مشاهده همه
                </Button>
              </Stack>
            )}

            <Stack direction="row" dir="rtl" spacing={1} sx={{ px: 2 }}>
              {pageCourses.map((p) => (
                <OfferCourseCard key={p.id} {...p} />
              ))}
            </Stack>
          </Stack>
        </Scrollbar>
      </Stack>
    </Box>
  );
}
