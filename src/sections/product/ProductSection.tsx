import { useEffect, useState } from 'react';
// next
import { useRouter } from 'next/router';
import { useParams } from 'next/navigation';
// @mui
import { Container, LinearProgress, Stack, useTheme } from '@mui/material';
// components
import CustomBreadcrumbs from '@/components/custom-breadcrumbs/CustomBreadcrumbs';
// routes
import { PATH_PAGE } from '@/routes/paths';
// sections
import { ProductMain, ProductSimilar, ProductTabs } from '@/sections/product';
// redux
import { useDispatch, useSelector } from '@/redux/store';
// operators
import getProduct from '@/modules/product/redux/operators/getProduct';

// ----------------------------------------------------------------------

const makeBreadCrumbs = (title: string) => [
  { name: 'خانه', href: PATH_PAGE.root },
  { name: 'فروشگاه', href: PATH_PAGE.shop },
  { name: title },
];

// ----------------------------------------------------------------------

export default function ProductSection() {
  //
  const {
    palette: { mode },
  } = useTheme();

  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  const { push, isReady } = useRouter();

  const { title, relatedProduct } = useSelector((s) => s.product.product);

  const params = useParams();

  const successCallback = () => {
    setIsLoading(false);
  };

  const errorCallback = (err: any) => {
    if (`${err.status}` === '404') {
      push(PATH_PAGE.page404);
    }
  };

  useEffect(() => {
    if (isReady) {
      dispatch(getProduct(`${params.product_id}`, successCallback, errorCallback));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, isReady]);

  return (
    <Container dir="rtl" sx={{ my: 7, mb: 10 }}>
      {isLoading && (
        <Stack justifyContent="center" sx={{ height: 300 }}>
          <LinearProgress />
        </Stack>
      )}
      {!isLoading && (
        <>
          <CustomBreadcrumbs
            links={makeBreadCrumbs(title)}
            sx={{
              backgroundColor: (theme) => theme.palette.grey[mode === 'dark' ? 900 : 100],
              p: 1,
            }}
          />

          <ProductMain />

          {relatedProduct.length !== 0 && <ProductSimilar />}

          <ProductTabs />
        </>
      )}
    </Container>
  );
}
