// @mui
import { Avatar, Paper, Stack, Typography } from '@mui/material';
// hooks
import useResponsive from '@/hooks/useResponsive';
// redux
import { useSelector } from '@/redux/store';
// paths
import { PATH_PAGE } from '@/routes/paths';

// ----------------------------------------------------------------------

export default function CourseSideDoublerInfo() {
  const { dubler } = useSelector((s) => s.course.course);

  const isMobile = useResponsive('down', 'sm');

  return (
    dubler != null && (
      <Paper
        variant={isMobile ? 'elevation' : 'outlined'}
        elevation={0}
        sx={{
          p: { sm: 2, xs: 0 },
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <Avatar src={PATH_PAGE.avatarImageUrl(dubler.avatar)} />
          <Typography fontWeight={500}>دوبلور :</Typography>
          <Typography fontWeight={600}>{dubler.fullname}</Typography>
        </Stack>

        <Typography fontWeight={500} sx={{ mt: 2 }}>
          {dubler.about}
        </Typography>
      </Paper>
    )
  );
}
