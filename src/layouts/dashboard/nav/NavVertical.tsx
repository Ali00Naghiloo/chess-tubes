// @mui
import { Box, Paper, Stack, useTheme } from '@mui/material';
// utils
import { bgBlur } from '@/utils/cssStyles';
// hooks
import useResponsive from '@/hooks/useResponsive';
// components
import Scrollbar from '@/components/scrollbar/Scrollbar';
import { NavSectionVertical } from '../../../components/nav-section';
// config
import { NAV } from '../../../config-global';
//
import navConfig from './config-navigation';
import NavAccount from './NavAccount';

// ----------------------------------------------------------------------

export default function NavVertical() {
  //
  const theme = useTheme();

  const isDesktop = useResponsive('up', 'md');

  const renderContent = (
    <>
      {' '}
      <Stack
        spacing={3}
        sx={{
          pt: 1,
          pb: 2,
          px: 2.5,
          flexShrink: 0,
        }}
      >
        <NavAccount />
      </Stack>
      <NavSectionVertical data={navConfig} />
      <Box sx={{ flexGrow: 1 }} />
    </>
  );

  return (
    <Paper
      variant="outlined"
      sx={{
        height: { md: 540, xs: 'fit-content' },
        position: 'sticky',
        width: { md: NAV.W_DASHBOARD, xs: '100%' },
        top: 130,
        left: 0,
        ...(!isDesktop && { border: 0 }),
        ...bgBlur({
          color: theme.palette.background.default,
          blur: 20,
          opacity: 0.9,
        }),
      }}
    >
      <Scrollbar
        sx={{
          height: 1,
          '& .simplebar-content': {
            height: 1,
            display: 'flex',
            flexDirection: 'column',
          },
        }}
      >
        <Stack
          alignItems="center"
          component="nav"
          sx={{
            flexShrink: { lg: 0 },
            width: { lg: NAV.W_DASHBOARD },
          }}
        >
          <Box
            sx={{
              width: NAV.W_DASHBOARD,
            }}
          >
            {renderContent}
          </Box>
        </Stack>
      </Scrollbar>
    </Paper>
  );
}
