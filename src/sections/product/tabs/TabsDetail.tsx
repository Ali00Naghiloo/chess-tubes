// @mui
import { Box, Stack, Typography, useTheme } from '@mui/material';
// hooks
import useResponsive from '@/hooks/useResponsive';
// redux
import { useSelector } from '@/redux/store';

// ----------------------------------------------------------------------

export default function TabsDetail() {
  //
  const {
    palette: { mode },
  } = useTheme();

  const isMobile = useResponsive('down', 'sm');

  const { attributes } = useSelector((s) => s.product.product);

  return (
    <Box sx={{ pb: 4, px: { sm: 4, xs: 2 } }}>
      <Typography sx={{ mb: 3 }} fontWeight={600}>
        مشخصات فنی محصول
      </Typography>
      {Object.keys(attributes).map((d) => (
        <Stack
          key={d}
          direction="row"
          spacing={3}
          justifyContent="flex-start"
          alignItems="center"
          sx={{
            mb: 1.5,
            '&>*': {
              p: 1,
              backgroundColor: `grey.${mode === 'dark' ? 900 : 100}`,
              px: 2,
            },
            ...(isMobile && {
              borderBottom: 1,
              borderColor: 'grey.200',
              '&>*': {
                backgroundColor: 'transparent',
                width: '50%',
                px: 0,
              },
            }),
          }}
        >
          <Typography fontWeight={500} sx={{ width: 300 }}>
            {d}
          </Typography>
          <Typography fontWeight={700} sx={{ width: 600 }}>
            {attributes[d]}
          </Typography>
        </Stack>
      ))}
    </Box>
  );
}
