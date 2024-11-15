// components
import Iconify from '@/components/iconify/Iconify';
import Scrollbar from '@/components/scrollbar/Scrollbar';
// @mui
import { Button, Divider, Stack, Typography } from '@mui/material';
// routes
import { PATH_PAGE } from '@/routes/paths';
import { useSelector } from '@/redux/store';
import NewPageCard from '@/components/new-card/new-page-card/NewPageCard';
import HorizontalScrollbar from '@/components/horizontal-scrollbar';
import React from 'react';

// ----------------------------------------------------------------------

export default function HomeNews() {
  //

  const { pageNews } = useSelector((s) => s.news);

  return (
    <Stack>
      {/*  */}
      <Stack direction="row" justifyContent="space-between" sx={{ mb: 3 }}>
        <Typography variant="h6" fontWeight={800}>
          جدیدترین اخبار
        </Typography>

        <Button
          href={PATH_PAGE.news.root}
          color="inherit"
          size="small"
          dir="rtl"
          endIcon={
            <Iconify
              sx={{
                color: (theme) => theme.palette.primary.contrastText,
                backgroundColor: (theme) => theme.palette.darkPrimary.main,
                width: 20,
                height: 20,
                borderRadius: 1,
                p: 0.1,
              }}
              icon="eva:arrow-back-fill"
            />
          }
        >
          مشاهده همه
        </Button>
      </Stack>
      {/*  */}

      <Scrollbar dir="rtl" sx={{ position: 'relative' }}>
        <HorizontalScrollbar>
          <Stack
            divider={<Divider orientation="vertical" flexItem />}
            direction="row"
            spacing={1}
            dir="rtl"
            justifyContent="flex-start"
            sx={{ display: 'inline-flex', width: { lg: '100%', xs: 'inherit' } }}
          >
            {pageNews.map((p, i) => (
              <React.Fragment key={`${p.id} ${i}`}>
                <NewPageCard {...p} />
                {i === pageNews.length - 1 && <Divider orientation="vertical" flexItem />}
              </React.Fragment>
            ))}
          </Stack>
        </HorizontalScrollbar>
      </Scrollbar>
    </Stack>
  );
}
