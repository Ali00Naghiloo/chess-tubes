import React from 'react';
// components
import Iconify from '@/components/iconify/Iconify';
import Scrollbar from '@/components/scrollbar/Scrollbar';
import HorizontalScrollbar from '@/components/horizontal-scrollbar/HorizontalScrollbar';
import PageProductCard from '@/components/shop-card/page-product/PageProductCard';
// @mui
import { Button, Divider, Stack, Typography, styled } from '@mui/material';
// routes
import { PATH_PAGE } from '@/routes/paths';
// redux
import { useSelector } from '@/redux/store';

// ----------------------------------------------------------------------

const StyledUnderlay = styled('div')(({ theme }) => ({
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: -1,
  position: 'absolute',
  backgroundImage: 'url(/assets/images/backgrounds/ic_background2.svg)',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'top 100px right -250px',
  backgroundSize: '500px 300px',
  opacity: 0.5,
}));

// ----------------------------------------------------------------------

export default function HomeShop() {
  //

  const { pageProducts } = useSelector((s) => s.product);

  return (
    <Stack sx={{}}>
      <StyledUnderlay />
      {/*  */}
      <Stack direction="row" justifyContent="space-between" sx={{ mb: 3 }}>
        <Typography variant="h6" fontWeight={800}>
          فروشگاه
        </Typography>

        <Button
          href={PATH_PAGE.shop}
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
            {/* {pageProducts.map((p) => (
              <ShopCard key={p.id} {...p} />
            ))} */}
            {pageProducts.map((p, i) => (
              <React.Fragment key={`${p.id} ${i}`}>
                <PageProductCard {...p} />
                {i === pageProducts.length - 1 && <Divider orientation="vertical" flexItem />}
              </React.Fragment>
            ))}
          </Stack>
        </HorizontalScrollbar>
      </Scrollbar>
    </Stack>
  );
}
