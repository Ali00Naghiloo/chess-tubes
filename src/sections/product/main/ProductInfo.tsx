import { useState } from 'react';
// @mui
import { Box, Button, Divider, Paper, Stack, Typography } from '@mui/material';
// components
import Iconify from '@/components/iconify/Iconify';
// redux
import { useSelector } from '@/redux/store';
import { enNumToPer } from '@/utils/persianUtils';

// ----------------------------------------------------------------------

export default function ProductInfo() {
  const [isShowMore, setIsShowMore] = useState(false);

  const { attributes, recommendPercent, suggestionCount, commentsCount, rate, title } = useSelector(
    (s) => s.product.product
  );

  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Typography variant="h6">{title}</Typography>

      <Divider sx={{ my: 1.5 }} />

      <Stack
        direction="row"
        spacing={3}
        divider={<Divider orientation="vertical" sx={{ height: 20 }} />}
      >
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <Iconify sx={{ width: 18, height: 18, color: 'orange' }} icon="eva:star-fill" />

          <Typography variant="subtitle1">{enNumToPer(rate)}</Typography>

          {/* <Typography variant="caption">(۱۴۲۵)</Typography> */}
        </Stack>

        <Stack direction="row" alignItems="center" spacing={0.5}>
          <Typography variant="subtitle1" sx={{ color: (theme) => theme.palette.info.main }}>
            {enNumToPer(commentsCount)}
          </Typography>

          <Typography variant="body2">دیدگاه کاربران</Typography>
        </Stack>

        {/* <Stack direction="row" alignItems="center" spacing={0.5}>
          <Typography variant="subtitle1" sx={{ color: (theme) => theme.palette.info.main }}>
            ۲
          </Typography>

          <Typography variant="body2">پرسش و پاسخ</Typography>
        </Stack> */}
      </Stack>

      <Divider sx={{ my: 1.5 }} />

      {recommendPercent != null && (
        <Typography variant="subtitle2" fontWeight={500}>
          <Typography
            variant="subtitle2"
            component="span"
            fontWeight={500}
            sx={{ color: (theme) => theme.palette.success.light }}
          >
            {`${enNumToPer(recommendPercent)}%`} درصد کاربران
          </Typography>{' '}
          ({enNumToPer(suggestionCount)} نفر) خرید این محصول را پیشنهاد داده اند
        </Typography>
      )}

      <Box sx={{ my: 2 }}>
        {attributes['منبع تامین انرژی'] && (
          <>
            {' '}
            <Typography variant="subtitle2" sx={{ opacity: 0.7 }}>
              ویژگی های محصول:
            </Typography>
            <Stack sx={{ my: 1, height: isShowMore ? 'auto' : 75, overflow: 'hidden' }}>
              {Object.keys(attributes).map((prop) => (
                <Box key={prop}>
                  <Typography variant="subtitle1" fontWeight={500}>
                    {prop} : {attributes[prop]}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </>
        )}
        <Button
          color="info"
          size="small"
          onClick={() => setIsShowMore((s) => !s)}
          endIcon={
            <Iconify
              icon={isShowMore ? 'eva:arrow-ios-upward-fill' : 'eva:arrow-ios-downward-fill'}
            />
          }
        >
          {isShowMore ? 'توضیحات کمتر' : 'توضیحات بیشتر'}
        </Button>
      </Box>
    </Paper>
  );
}
