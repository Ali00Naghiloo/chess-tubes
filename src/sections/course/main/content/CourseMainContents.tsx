// @mui
import { Box, Stack, Typography } from '@mui/material';
// components
import Iconify from '@/components/iconify/Iconify';
// redux
import { useSelector } from '@/redux/store';
//
import CourseChapter from './CourseChapter';

// ----------------------------------------------------------------------

export default function CourseMainContents() {
  //

  const content = useSelector((s) => s.course.content);

  return (
    <Box>
      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 3 }}>
        <Iconify
          icon="fa6-solid:chess-knight"
          color="text.secondary"
          sx={{ width: 35, height: 35 }}
        />

        <Typography variant="h6">سر فصل های دوره</Typography>
      </Stack>

      {content.map((ac, index) => (
        <CourseChapter key={ac.id} {...ac} index={index} />
      ))}
    </Box>
  );
}
