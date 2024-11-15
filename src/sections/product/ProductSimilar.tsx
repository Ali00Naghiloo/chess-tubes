import React from 'react';
// components
import Iconify from '@/components/iconify/Iconify';
import Scrollbar from '@/components/scrollbar/Scrollbar';
import RelatedShopCard from '@/components/shop-card/related-product/RelatedShopCard';
// redux
import { useSelector } from '@/redux/store';
// @mui
import { Button, Divider, Paper, Stack, Typography } from '@mui/material';
import HorizontalScrollbar from '@/components/horizontal-scrollbar/HorizontalScrollbar';

// ----------------------------------------------------------------------

export default function ProductSimilar() {
  //
  const { relatedProduct } = useSelector((s) => s.product.product);

  return (
    <Paper variant="outlined" sx={{ my: 7, py: 2 }}>
      <Stack dir="ltr">
        {/*  */}
        <Stack direction="row" justifyContent="space-between" sx={{ mb: 3, px: { xs: 1, sm: 3 } }}>
          <Button
            color="inherit"
            size="small"
            dir="rtl"
            endIcon={
              <Iconify
                sx={{
                  color: (theme) => theme.palette.primary.contrastText,
                  backgroundColor: (theme) => theme.palette.primary.main,
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

          <Typography
            variant="h6"
            fontWeight={600}
            sx={{ borderBottom: 3, borderColor: 'primary.light' }}
          >
            محصولات مرتبط
          </Typography>
        </Stack>

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
              {relatedProduct.map((p, i) => (
                <React.Fragment key={`${p.id} ${i}`}>
                  <RelatedShopCard {...p} />
                  {i === relatedProduct.length - 1 && <Divider orientation="vertical" flexItem />}
                </React.Fragment>
              ))}
            </Stack>
          </HorizontalScrollbar>
        </Scrollbar>
      </Stack>
    </Paper>
  );
}
