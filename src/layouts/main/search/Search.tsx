import { useEffect, useRef, useState } from 'react';
// next
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';
// @mui
import {
  Backdrop,
  Box,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  Paper,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
// components
import Iconify from '@/components/iconify/Iconify';
// css styles
import { bgBlur } from '@/utils/cssStyles';
// animation
import { AnimatePresence, m } from 'framer-motion';
// routes
import { PATH_PAGE } from '@/routes/paths';
// hooks
import useCaptureClickOutside from '@/hooks/useCaptureClickOutside';

// ----------------------------------------------------------------------

const href = (query: string, section: string, newsType: string | null): string => {
  const type = section === 'all' ? '' : `&type=${section}`;
  const nType = newsType != null ? `&pt=${newsType}` : '';
  return `${PATH_PAGE.search}?q=${query}${type}${nType}`;
};

const SEARCH_ITEM = [
  { name: 'محصولات', secondaryName: 'فروشگاه', type: 'products', newsType: null },
  { name: 'اخبار داخلی', secondaryName: 'اخبار داخلی', type: 'news', newsType: 'internal' },
  { name: 'اخبار خارجی', secondaryName: 'اخبار خارجی', type: 'news', newsType: 'international' },
  { name: 'اخبار', secondaryName: 'همه اخبار', type: 'news', newsType: null },
  { name: 'دوره ها', secondaryName: 'دوره های آموزشی', type: 'courses', newsType: null },
  {
    name: 'دوره آنلاین',
    secondaryName: 'دوره های آنلاین',
    type: 'online-course',
    newsType: null,
  },
  { name: 'تفسیر آنلاین', secondaryName: 'تفسیر آنلاین', type: 'live-analysis', newsType: null },
  { name: 'همه', secondaryName: 'همه بخش ها', type: 'all', newsType: null },
];

// ----------------------------------------------------------------------

type SearchProps = { openSearch: boolean; onCloseSearch: VoidFunction };

export default function Search({ openSearch, onCloseSearch }: SearchProps) {
  //

  const theme = useTheme();

  const [query, setQuery] = useState('');

  const { isReady } = useRouter();

  const querySearchParams = useSearchParams();

  useEffect(() => {
    if (isReady) {
      setQuery(querySearchParams.get('q') ?? '');
    }
  }, [isReady, querySearchParams]);

  const paperRef: any = useRef();

  useCaptureClickOutside(paperRef, onCloseSearch);

  const handleQuerySearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.currentTarget.value);
  };

  return (
    <Backdrop
      dir="rtl"
      open={openSearch}
      sx={{
        color: '#fff',
        zIndex: (t) => t.zIndex.drawer + 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}
    >
      <AnimatePresence>
        <Paper
          component={m.div}
          initial={{ opacity: 0, translateY: '-60px' }}
          animate={{ opacity: 1, translateY: '0px' }}
          exit={{ opacity: 0, translateY: '-60px' }}
          transition={{ duration: 0.3 }}
          style={{ overflow: 'hidden' }}
          ref={paperRef}
          variant="elevation"
          sx={{
            width: { xs: '100%', md: '60%' },
            minHeight: 100,
            overflow: 'hidden',
            p: 2,
            boxShadow: 0,
            ...bgBlur({
              color: theme.palette.background.default,
            }),
          }}
        >
          <TextField
            variant="outlined"
            fullWidth
            placeholder="جست و جو در چس تیوبز..."
            dir="rtl"
            value={query}
            onChange={handleQuerySearch}
            sx={{ mb: 2 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" onClick={() => setQuery('')}>
                  <IconButton>
                    <Iconify icon="eva:close-circle-outline" />
                  </IconButton>
                </InputAdornment>
              ),
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton type="button">
                    <Iconify icon="eva:search-fill" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <AnimatePresence>
            {query !== '' && (
              <Box
                component={m.div}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 250 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                style={{ overflowY: 'auto' }}
              >
                <List>
                  {SEARCH_ITEM.map((item) => (
                    <SearchListItem key={item.secondaryName} {...item} query={query} />
                  ))}
                </List>
              </Box>
            )}
          </AnimatePresence>
        </Paper>
      </AnimatePresence>
    </Backdrop>
  );
}

// ----------------------------------------------------------------------

type SearchListItemProps = {
  name: string;
  secondaryName: string;
  query: string;
  type: string;
  newsType: string | null;
};

function SearchListItem({ name, secondaryName, query, type, newsType }: SearchListItemProps) {
  return (
    <ListItem
      disablePadding
      secondaryAction={
        <Typography
          sx={{
            userSelect: 'none',
            display: 'flex',
            alignItems: 'center',
            color: (theme) => theme.palette.grey[600],
          }}
          variant="body2"
          fontWeight={600}
        >
          جستجو در
          <Typography
            component="span"
            variant="body2"
            fontWeight={700}
            sx={{ ml: 1, color: (theme) => theme.palette.text.primary }}
          >
            {secondaryName}
          </Typography>
        </Typography>
      }
    >
      <ListItemButton href={href(query, type, newsType)}>
        <Iconify icon="eva:search-fill" sx={{ mr: 1 }} />
        <Typography display="flex" alignItems="center" variant="body2" fontWeight={500}>
          {name} :{' '}
          <Typography
            component="span"
            sx={{ ml: 1, whiteSpace: 'pre-wrap' }}
            variant="body2"
            color="primary"
            fontWeight={700}
          >
            {query}
          </Typography>
        </Typography>
      </ListItemButton>
    </ListItem>
  );
}
