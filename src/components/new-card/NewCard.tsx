// @mui
import { Box, Link, Paper, PaperProps, Stack, Typography } from '@mui/material';
// utils
import { fDate } from '@/utils/formatTime';
// modules
import { NewsCard } from '@/modules/news/models/news';
// paths
import { PATH_PAGE } from '@/routes/paths';
// components
import Image from '@/components/image/';
import Iconify from '../iconify';

// ----------------------------------------------------------------------

export type NewCardProps = PaperProps &
  NewsCard & {
    isInternal?: boolean;
    // image: string;
    // title: string;
    // description: string;
    // time: string;
  };

export default function NewCard({
  image,
  title,
  isInternal = true,
  id,
  publishDate,
  sx,
  ...other
}: NewCardProps) {
  //
  return (
    <Paper
      dir="ltr"
      variant="outlined"
      sx={{
        width: 250,
        height: 350,
        // pt: 0.5,
        // px: 1,
        position: 'relative',
        cursor: 'pointer',
        '&:hover': { boxShadow: (theme) => theme.shadows[2] },
        ...sx,
      }}
      {...other}
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
          alt={title}
          src={image.replace('https', 'http')}
          style={{ objectFit: 'cover' }}
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

        <Box dir="rtl" sx={{ mt: 0.8, px: 1 }}>
          {/* <Typography
            variant="caption"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: '2',
              WebkitBoxOrient: 'vertical',
              height: 35,
              lineHeight: 1.4,
              opacity: 0.7,
            }}
            fontWeight={500}
          >
            {description}
          </Typography> */}
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
    </Paper>
  );
}
