// @mui
import { Avatar, Paper, Stack, Typography } from '@mui/material';
// hooks
import useResponsive from '@/hooks/useResponsive';
// redux
import { useSelector } from '@/redux/store';
// paths
import { PATH_PAGE } from '@/routes/paths';

// ----------------------------------------------------------------------

export default function CourseSideTranslatorInfo() {
  //

  const { translator } = useSelector((s) => s.onlineCourse.course);

  const isMobile = useResponsive('down', 'sm');

  return (
    translator != null && (
      <Paper
        variant={isMobile ? 'elevation' : 'outlined'}
        elevation={0}
        sx={{
          p: { sm: 2, xs: 0 },
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <Avatar src={PATH_PAGE.avatarImageUrl(translator.avatar)} />
          <Typography fontWeight={500}>مترجم دوره :</Typography>
          <Typography fontWeight={600}>{translator.fullname}</Typography>
        </Stack>

        <Typography fontWeight={500} sx={{ mt: 2 }}>
          {translator.about}
        </Typography>
      </Paper>
    )
  );
}
