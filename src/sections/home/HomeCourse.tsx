import React from 'react';
// components
import Iconify from '@/components/iconify/Iconify';
import Scrollbar from '@/components/scrollbar/Scrollbar';
import RelatedCourseCard from '@/components/course-card/related-course/RelatedCourseCard';
import HorizontalScrollbar from '@/components/horizontal-scrollbar';
// @mui
import { Button, Divider, Stack, Typography } from '@mui/material';
// routes
import { PATH_PAGE } from '@/routes/paths';
// redux
import { useSelector } from '@/redux/store';

// ----------------------------------------------------------------------

export default function HomeCourse() {
  //

  const { pageCourses } = useSelector((s) => s.course);

  return (
    <Stack>
      {/*  */}
      <Stack direction="row" justifyContent="space-between" sx={{ mb: 3 }}>
        <Typography variant="h6" fontWeight={800}>
          دوره های آموزشی
        </Typography>
        <Button
          href={PATH_PAGE.courses}
          color="inherit"
          size="small"
          dir="rtl"
          endIcon={
            <Iconify
              sx={{
                color: (theme) => theme.palette.primary.contrastText,
                backgroundColor: (theme) => theme.palette.darkPrimary.main,
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
      {/*  */}

      <Scrollbar dir="rtl" sx={{ position: 'relative' }}>
        <HorizontalScrollbar>
          <Stack
            divider={<Divider orientation="vertical" flexItem />}
            direction="row"
            spacing={1}
            dir="rtl"
            justifyContent="flex-start"
            sx={{ display: 'inline-flex', width: { lg: '100%', xs: 'inherit' } }}
          >
            {pageCourses.map((p, i) => (
              <React.Fragment key={`${p.id} ${i}`}>
                <RelatedCourseCard {...p} />
                {i === pageCourses.length - 1 && <Divider orientation="vertical" flexItem />}
              </React.Fragment>
            ))}
          </Stack>
        </HorizontalScrollbar>
      </Scrollbar>
    </Stack>
  );
}
