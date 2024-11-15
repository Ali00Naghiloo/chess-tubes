// @mui
import { Box, Stack, Typography } from '@mui/material';
// components
import Iconify from '@/components/iconify/Iconify';
// redux
import { useSelector } from '@/redux/store';

// ----------------------------------------------------------------------

export default function CourseMainDescription() {
  const { description } = useSelector((s) => s.course.course);
  return (
    <Box>
      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 3 }}>
        <Iconify
          icon="fa6-solid:chess-bishop"
          color="text.secondary"
          sx={{ width: 35, height: 35 }}
        />
        {/* <ChessLearningIcon sx={{ width: 45, height: 45 }} /> */}
        <Typography variant="h6">توضیحات کلی دوره</Typography>
      </Stack>

      {/* // TODO Must use a good text editor and reader...   */}
      {description.split('\n').map((t, i) => (
        <Typography key={i} paragraph fontWeight={500}>
          {t}
        </Typography>
      ))}
    </Box>
  );
}
