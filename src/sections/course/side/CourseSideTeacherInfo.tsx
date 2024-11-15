// @mui
import { Avatar, Paper, Stack, Typography } from '@mui/material';
// hooks
import useResponsive from '@/hooks/useResponsive';
// redux
import { useSelector } from '@/redux/store';
// paths
import { PATH_PAGE } from '@/routes/paths';

// ----------------------------------------------------------------------

export default function CourseSideTeacherInfo() {
  //

  const { teacher } = useSelector((s) => s.course.course);

  const isMobile = useResponsive('down', 'sm');

  return (
    teacher != null && (
      <Paper
        variant={isMobile ? 'elevation' : 'outlined'}
        elevation={0}
        sx={{
          p: { sm: 2, xs: 0 },
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <Avatar src={PATH_PAGE.avatarImageUrl(teacher.avatar)} />
          <Typography fontWeight={500}>مدرس دوره :</Typography>
          <Typography fontWeight={600}>{teacher.fullname}</Typography>
        </Stack>

        <Typography fontWeight={500} sx={{ mt: 2 }}>
          {teacher.about}
        </Typography>
      </Paper>
    )
  );
}
