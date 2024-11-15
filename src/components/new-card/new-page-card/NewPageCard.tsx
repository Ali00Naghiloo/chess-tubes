// @mui
import { Box, Link, Stack, Typography } from '@mui/material';
// utils
import { fDate } from '@/utils/formatTime';
// paths
import { PATH_PAGE } from '@/routes/paths';
// models
import { PageNews } from '@/modules/news/redux/states';
// components
import Image from '@/components/image/';
import Iconify from '@/components/iconify';

// ----------------------------------------------------------------------

export type NewPageCardProps = PageNews & {
  isInternal?: boolean;
};

export default function NewPageCard({
  image,
  title,
  id,
  publishDate,
  isInternal = true,
}: NewPageCardProps) {
  //
  return (
    <Box
      dir="ltr"
      sx={{
        minWidth: 180,
        width: 180,
        height: 350,
        position: 'relative',
        cursor: 'pointer',

        px: 1,
        py: 0,
      }}
    >
      <Link
        underline="none"
        color="inherit"
        href={
          isInternal
            ? `${PATH_PAGE.news.internalNews}/${id}`
            : `${PATH_PAGE.news.externalNews}/${id}`
        }
      >
        <Image
          draggable={false}
          alt={title}
          src={PATH_PAGE.newsImage(image)}
          style={{ objectFit: 'contain' }}
          sx={{ width: '100%', height: 200, borderRadius: 0.5 }}
        />
        <Box dir="rtl" sx={{ mt: 1.5, px: 1 }}>
          <Typography
            variant="body2"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: '2',
              WebkitBoxOrient: 'vertical',
              height: 35,
              lineHeight: 1.4,
            }}
            fontWeight={700}
          >
            {title}
          </Typography>
        </Box>

        <Stack
          direction="row"
          alignItems="center"
          dir="rtl"
          sx={{ mt: 1.5, opacity: 0.7, px: 1 }}
          spacing={0.6}
        >
          <Iconify icon="eva:calendar-fill" />
          <Typography fontWeight={600} variant="caption">
            {fDate(Number(publishDate))}
          </Typography>
        </Stack>
      </Link>
    </Box>
  );
}
