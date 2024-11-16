import React from 'react';
// next
import Image from 'next/image';
// @mui
import { Box, Button, Stack, Typography } from '@mui/material';
// components
import Iconify from '@/components/iconify/Iconify';
import Scrollbar from '@/components/scrollbar/Scrollbar';
// hooks
import useResponsive from '@/hooks/useResponsive';
// redux
import { useSelector } from '@/redux/store';
// components
import HorizontalScrollbar from '@/components/horizontal-scrollbar';
import ShopCard from '@/components/shop-card';
//

// ----------------------------------------------------------------------

export default function ShopOffers() {
  //

  const isMobile = useResponsive('down', 'sm');

  const { pageProducts } = useSelector((s) => s.product);

  return (
    <Box
      sx={{
        width: '100%',
        overflow: 'hidden',
        display: { xs: 'block', sm: 'flex' },
        alignItems: 'flex-end',
        pt: 1,
        bgcolor: (t) =>
          t.palette.mode === 'dark' ? t.palette.primary.dark : t.palette.primary.light,
        borderRadius: 5,
      }}
    >
      {isMobile && (
        <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Image
              alt="chess_pieces"
              src="/assets/icons/home/ic_chess_pieces.svg"
              width={35}
              height={35}
            />
            <Typography color="primary" variant="h6" fontWeight={700}>
              پیشنهادات چس تیوبز
            </Typography>
          </Stack>
          <Button
            sx={{ mb: 1 }}
            color="inherit"
            endIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
          >
            مشاهده همه
          </Button>
        </Stack>
      )}
      <Stack sx={{ overflow: 'hidden', mb: 1, width: '100%' }}>
        <Scrollbar dir="rtl" sx={{ position: 'relative' }}>
          <HorizontalScrollbar>
            <Stack direction="row" spacing={1} sx={{ height: '100%' }} alignItems="center">
              {!isMobile && (
                <Stack
                  sx={{ height: '100%', pl: 3 }}
                  alignItems="center"
                  spacing={5}
                  justifyContent="space-between"
                >
                  <Typography
                    sx={{ color: (theme) => theme.palette.darkPrimary.main }}
                    variant="h4"
                    textAlign="center"
                    fontWeight={900}
                  >
                    پیشنهادات <br /> چس تیوبز
                  </Typography>
                  <Stack direction="row" sx={{ mx: 3 }}>
                    <Image
                      alt="chess_pieces"
                      src="/assets/icons/home/ic_chess_pieces.svg"
                      width={80}
                      height={80}
                    />
                  </Stack>
                  <Button
                    sx={{ mb: 1 }}
                    color="inherit"
                    endIcon={
                      <Iconify
                        sx={{
                          bgcolor: (theme) => theme.palette.darkPrimary.main,
                          color: (theme) => theme.palette.primary.contrastText,
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
              )}

              <Stack direction="row" dir="rtl" spacing={1} sx={{ px: 2 }}>
                {pageProducts
                  ? pageProducts.map((p) => (
                      <ShopCard
                        key={p.id}
                        {...p}
                        discount={{
                          discountPercent: p.discountPercent,
                        }}
                        paperProps={{ sx: { width: 210 } }}
                      />
                    ))
                  : null}
              </Stack>
            </Stack>
          </HorizontalScrollbar>
        </Scrollbar>
      </Stack>
    </Box>
  );
}
