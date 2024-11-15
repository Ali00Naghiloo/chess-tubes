// @mui
import { Box, Link, Paper, Stack, Typography, alpha } from '@mui/material';
// components
import Image from '@/components/image';
// paths
import { PATH_PAGE } from '@/routes/paths';
// utils
import { bgBlur } from '@/utils/cssStyles';
import { enNumToPer } from '@/utils/persianUtils';
// models
import { SearchResultItemTypes, SearchResultItems } from '@/modules/global/redux/states';

// ----------------------------------------------------------------------

const findHref = (
  type: SearchResultItemTypes,
  id: number,
  postType: 'internal' | 'international' | null
) => {
  if (type === 'course') {
    return PATH_PAGE.course(id);
  }
  if (type === 'product') {
    return PATH_PAGE.product(id);
  }
  if (postType != null) {
    if (postType === 'internal') {
      return PATH_PAGE.news.internalNew(id);
    }
    return PATH_PAGE.news.externalNew(id);
  }
  return '';
};

const findImage = (type: SearchResultItemTypes, image: string) => {
  if (image.startsWith('http')) {
    return image.replace('https', 'http');
  }
  if (type === 'course') {
    return PATH_PAGE.courseImageUrl(image);
  }
  if (type === 'news') {
    if (image.startsWith('http')) {
      return image.replace('https', 'http'); // TODO MUST CHANGE IN FUTURE
    }
    return PATH_PAGE.newsImage(image);
  }
  return PATH_PAGE.productImageUrl(image);
};

type SearchCardProps = SearchResultItems;

export default function SearchCard({
  id,
  image,
  mainImage,
  postType,
  title,
  type,
  discount,
}: SearchCardProps) {
  return (
    <Paper
      dir="ltr"
      variant="outlined"
      sx={{
        width: { sm: 200, xs: 175 },
        height: 330,
        position: 'relative',
        cursor: 'pointer',
        ...(discount != null && {
          border: 1,
          borderColor: (t) => alpha(t.palette.error.light, 0.5),
          boxShadow: (t) => `0px 1px 7px 0.5px ${t.palette.primary.light}`,
        }),
      }}
    >
      <Link href={findHref(type, id, postType)} color="inherit" underline="none">
        <Image
          alt={title}
          src={findImage(type, image == null ? mainImage : image)} // TODO MUST CHANGE IN FUTURE
          style={{ objectFit: 'contain' }}
          sx={{ width: '100%', height: 200, borderRadius: 0.5 }}
        />
        <Box dir="rtl" sx={{ mt: 1.5 }}>
          <Typography
            variant="button"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: '2',
              WebkitBoxOrient: 'vertical',
              height: 37,
              lineHeight: 1.4,
              px: 1,
            }}
            fontWeight={600}
          >
            {title}
          </Typography>
        </Box>
        <Box sx={{ px: 1 }}>
          {discount != null && !!discount.discountPercent && (
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              sx={{
                position: 'absolute',
                top: 12,
                left: 15,
                bgcolor: (theme) =>
                  bgBlur({ blur: 20, color: theme.palette.error.main, opacity: 0.9 }),
                padding: 0.5,
                color: (theme) => theme.palette.error.contrastText,
                minWidth: 40,
                borderRadius: 3,
              }}
            >
              <Typography variant="subtitle2" sx={{ lineHeight: 0.9 }} fontWeight={600} dir="rtl">
                {enNumToPer(discount.discountPercent)}%
              </Typography>
            </Stack>
          )}
        </Box>
      </Link>
    </Paper>
  );
}
