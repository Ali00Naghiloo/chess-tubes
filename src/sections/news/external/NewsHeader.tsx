// @mui
import { Divider, Stack, Typography } from '@mui/material';
//
import useResponsive from '@/hooks/useResponsive';
import { ChessNewsIcon } from '@/assets/icons';

// ----------------------------------------------------------------------

export default function NewsHeader() {
  const isMobile = useResponsive('down', 'sm');

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 6 }}>
      <Typography
        fontWeight={800}
        variant={isMobile ? 'h5' : 'h4'}
        sx={{
          color: (theme) => theme.palette.primary.main,
          width: 'fit-content',
          whiteSpace: 'nowrap',
          mr: 2,
        }}
      >
        اخبار مهم خارجی
      </Typography>

      <Divider
        sx={{
          borderStyle: 'dashed',
          borderWidth: 2,
          flexGrow: 1,
        }}
      />

      <ChessNewsIcon sx={{ width: 50, ml: 2 }} />
    </Stack>
  );
}
