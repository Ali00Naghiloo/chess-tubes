import { useState } from 'react';
// components
import Iconify from '@/components/iconify/Iconify';
import Image from '@/components/image/Image';
import Lightbox from '@/components/lightbox/Lightbox';
import ShareBox from '@/components/share-box';
// redux
import { useDispatch, useSelector } from '@/redux/store';
// @mui
import { CircularProgress, IconButton, Paper, Stack, Tooltip, Typography } from '@mui/material';
// hooks
import useResponsive from '@/hooks/useResponsive';
// paths
import { PATH_PAGE } from '@/routes/paths';
//
import { toast } from 'react-toastify';
//
import addOrRemoveProductFromFav from '@/modules/product/redux/operators/addOrRemoveProductFromFav';
import requestStockAndDiscountNotification from '@/modules/product/redux/operators/requestStockAndDiscountNotification';

// ----------------------------------------------------------------------

export default function ProductImage() {
  //

  const isMobile = useResponsive('down', 'md');

  const { images, defaultImage, id } = useSelector((s) => s.product.product);

  const [isLightBoxOpen, setIsLightBoxOpen] = useState(false);

  const [anchorOrigin, setAnchorOrigin] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorOrigin);

  return (
    <Stack>
      <Paper variant="outlined" sx={{ p: 1, mb: 1 }}>
        <Lightbox
          slides={images.map((s) => ({
            src: PATH_PAGE.productImageUrl(s.fileName),
            alt: s.imageAlt,
          }))}
          open={isLightBoxOpen}
          close={() => setIsLightBoxOpen(false)}
        />

        <Image
          onClick={() => setIsLightBoxOpen(true)}
          src={PATH_PAGE.productImageUrl(defaultImage ?? '')}
          alt="تصویر محصول "
          style={{ objectFit: 'contain' }}
          sx={{
            width: '100%',
            height: 200,
            mb: 1,
          }}
        />

        <Stack direction="row" justifyContent="center" spacing={1}>
          <BellIcon productId={id} />

          <Tooltip title="اشتراک گذاری این محصول">
            <IconButton onClick={(e) => setAnchorOrigin(e.currentTarget)}>
              <Iconify icon="eva:share-fill" />
            </IconButton>
          </Tooltip>

          <FavoriteIcon productId={id} />
        </Stack>
      </Paper>

      <ShareBox open={open} anchorEl={anchorOrigin} onClose={() => setAnchorOrigin(null)} />

      {!isMobile && (
        <Stack direction="row" spacing={2}>
          {images.slice(1, 4).map((i) => (
            <Paper
              key={i.id}
              variant="outlined"
              sx={{ p: 1 }}
              onClick={() => setIsLightBoxOpen(true)}
            >
              <Image
                src={PATH_PAGE.productImageUrl(i.fileName)}
                alt={i.imageAlt}
                style={{ objectFit: 'contain' }}
                sx={{
                  width: 40,
                  height: 40,
                }}
              />
            </Paper>
          ))}

          {images.length > 4 && (
            <Paper
              variant="outlined"
              sx={{
                p: 1,
                width: 50,
                flexGrow: 1,
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
              }}
            >
              <Typography fontWeight={700} variant="subtitle1">
                {images.length - 4}+
              </Typography>
            </Paper>
          )}
        </Stack>
      )}
    </Stack>
  );
}

// ----------------------------------------------------------------------

type FavoriteIconProps = {
  productId: string | number;
};

function FavoriteIcon({ productId }: FavoriteIconProps) {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const successCallback = (msg: string) => {
    toast.success(msg ?? 'با موفقیت انجام شد');
    setIsLoading(false);
  };

  const failureCallback = (msg: string) => {
    toast.success(msg ?? 'یه مشکلی پیش اومده');
    setIsLoading(false);
  };

  const addToFavList = () => {
    setIsLoading(true);
    dispatch(addOrRemoveProductFromFav(productId, successCallback, failureCallback));
  };

  return (
    <Tooltip title="افزودن به علاقه مندی ها">
      <IconButton disabled={isLoading} onClick={addToFavList}>
        {isLoading && (
          <CircularProgress size="small" color="inherit" sx={{ opacity: 0.5, minWidth: 20 }} />
        )}
        {!isLoading && <Iconify icon="eva:heart-fill" />}
      </IconButton>
    </Tooltip>
  );
}

// ----------------------------------------------------------------------

type BellIconProps = {
  productId: string | number;
};

function BellIcon({ productId }: BellIconProps) {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const successCallback = (msg: string) => {
    toast.success(msg ?? 'با موفقیت انجام شد');
    setIsLoading(false);
  };

  const failureCallback = (msg: string) => {
    toast.success(msg ?? 'یه مشکلی پیش اومده');
    setIsLoading(false);
  };

  const requestStockAndDiscount = (e: React.MouseEvent<HTMLElement>) => {
    setIsLoading(true);
    dispatch(requestStockAndDiscountNotification(productId, successCallback, failureCallback));
  };

  return (
    <>
      {' '}
      <Tooltip title="اطلاع از موجودی و تخفیف ها">
        <IconButton disabled={isLoading} onClick={requestStockAndDiscount}>
          {isLoading && (
            <CircularProgress size="small" color="inherit" sx={{ opacity: 0.5, minWidth: 20 }} />
          )}
          {!isLoading && <Iconify icon="eva:bell-fill" />}
        </IconButton>
      </Tooltip>
    </>
  );
}
