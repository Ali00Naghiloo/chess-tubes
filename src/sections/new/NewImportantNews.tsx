// @mui
import { Box, Divider, Link, Paper, Stack, Typography } from '@mui/material';
// components
import Iconify from '@/components/iconify';
import Image from '@/components/image/Image';
// models
import { NewsCard } from '@/modules/news/models/news';
// redux
import { useSelector } from '@/redux/store';
// utils
import { fDate } from '@/utils/formatTime';

// ----------------------------------------------------------------------

export default function NewImportantNews() {
  //
  const { lastNews } = useSelector((s) => s.news.news);

  return (
    <Paper
      variant="outlined"
      sx={{
        height: 'fit-content',
        position: 'sticky',
        flexGrow: 1,
        top: 150,
        left: 0,
        p: 2,
      }}
    >
      <Typography variant="h6">آخرین خبر ها</Typography>

      <Divider sx={{ my: 2 }} />

      {lastNews.map((n) => (
        <NewItem key={n.id} {...n} />
      ))}
    </Paper>
  );
}

// ----------------------------------------------------------------------

function NewItem({ image, title, id, publishDate, slug }: NewsCard) {
  return (
    <Link underline="none" color="inherit" href={`${id}`}>
      <Stack
        sx={{ mb: 3, '&:hover': { backgroundColor: 'grey.100', borderRadius: 2 } }}
        direction="row"
      >
        <Box sx={{ width: 120, height: 80 }}>
          <Image
            src={image.replace('https', 'http')}
            alt={title}
            sx={{ width: '100%', height: '100%', borderRadius: 2 }}
          />
        </Box>
        <Stack sx={{ px: 1, width: 270 }} justifyContent="space-between">
          <Typography variant="subtitle1">{title}</Typography>
          <Stack direction="row" sx={{ opacity: 0.7 }} spacing={1}>
            <Iconify icon="eva:calendar-fill" />
            <Typography>{fDate(new Date(Number(publishDate)))}</Typography>
          </Stack>
        </Stack>
      </Stack>
    </Link>
  );
}
