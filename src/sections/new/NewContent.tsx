// @mui
import { Box, Button, Divider, Stack, Typography } from '@mui/material';
// components
import Iconify from '@/components/iconify/Iconify';
import Image from '@/components/image/Image';
// redux
import { useSelector } from '@/redux/store';
// utils
import { fDateTime } from '@/utils/formatTime';
import ShareBox from '@/components/share-box';
import { useState } from 'react';

// ----------------------------------------------------------------------

export default function NewContent() {
  //
  const { content, newsDate, newsImage, title } = useSelector((s) => s.news.news);

  const [anchorOrigin, setAnchorOrigin] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorOrigin);

  return (
    <Box sx={{ width: { lg: '60%', xs: '100%' } }}>
      <Image
        src={newsImage.replace('https', 'http')}
        alt={title}
        sx={{ height: 350, borderRadius: 2, mb: 2 }}
      />
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        sx={{ mb: 0.5 }}
        spacing={2}
      >
        <Typography variant="h5">{title}</Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" sx={{ opacity: 0.7 }} alignItems="center" spacing={1}>
          <Iconify icon="eva:calendar-fill" />
          <Typography variant="body2" fontWeight={500}>
            {fDateTime(new Date(Number(newsDate)))}
          </Typography>
        </Stack>
        <Button
          onClick={(e) => setAnchorOrigin(e.currentTarget)}
          size="small"
          variant="outlined"
          startIcon={<Iconify icon="eva:share-fill" />}
        >
          اشتراک گذاری خبر
        </Button>
      </Stack>

      <ShareBox
        text="اشتراک گذاری این خبر"
        open={open}
        anchorEl={anchorOrigin}
        onClose={() => setAnchorOrigin(null)}
      />

      <Divider sx={{ my: 3 }} />
      <Typography paragraph fontWeight={500}>
        {content}
      </Typography>
    </Box>
  );
}
