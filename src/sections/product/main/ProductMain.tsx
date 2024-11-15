// @mui
import { Grid } from '@mui/material';
//
import ProductImage from './ProductImage';
import ProductInfo from './ProductInfo';
import ProductPricing from './ProductPricing';

// ----------------------------------------------------------------------

export default function ProductMain() {
  return (
    <Grid container spacing={{ lg: 4, xs: 2 }}>
      <Grid item md={3.5} xs={12}>
        <ProductImage />
      </Grid>

      <Grid item md={5} xs={12}>
        <ProductInfo />
      </Grid>

      <Grid item md={3.5} xs={12}>
        <ProductPricing />
      </Grid>
    </Grid>
  );
}
