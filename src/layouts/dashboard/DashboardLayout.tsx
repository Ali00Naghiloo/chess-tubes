import { useEffect } from 'react';
// next
import { useRouter } from 'next/router';
// @mui
import { Box, Container, Divider, IconButton, Stack, Typography } from '@mui/material';
// components
import Iconify from '@/components/iconify/Iconify';
import CustomBreadcrumbs from '@/components/custom-breadcrumbs/CustomBreadcrumbs';
import { BreadcrumbsLinkProps } from '@/components/custom-breadcrumbs';
// hooks
import useResponsive from '@/hooks/useResponsive';
// HOC
import AuthGuard from '@/modules/user/hocs/AuthGuard';
// routes
import { PATH_DASHBOARD } from '@/routes/paths';
// config
import { NAV } from '@/config-global';
// layout
import MainLayout from '../main/MainLayout';
//
import NavVertical from './nav/NavVertical';
// ----------------------------------------------------------------------

type DashboardLayoutProps = {
  children: React.ReactNode;
  headerText?: string;
  breadCrumbsLink?: BreadcrumbsLinkProps[];
};

export default function DashboardLayout({
  children,
  headerText,
  breadCrumbsLink,
}: DashboardLayoutProps) {
  //
  const isDesktop = useResponsive('up', 'md');

  const { pathname, push, back } = useRouter();

  const isDashboardRoot = pathname === PATH_DASHBOARD.root;

  useEffect(() => {
    if (isDesktop && isDashboardRoot) {
      push(PATH_DASHBOARD.account);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, isDesktop]);

  return (
    <AuthGuard>
      <MainLayout>
        <Container>
          <Stack
            direction="row"
            spacing={4}
            dir="rtl"
            sx={{ mb: 5 }}
            justifyContent="space-between"
          >
            {(isDesktop || isDashboardRoot || children == null) && <NavVertical />}

            {!isDashboardRoot && (
              <Box sx={{ pt: 2, flexGrow: 1, width: `calc(100% - ${NAV.W_DASHBOARD}px)` }}>
                <>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6">{headerText ?? 'داشبورد'}</Typography>
                    {!isDesktop && (
                      <IconButton size="large" onClick={back}>
                        <Iconify icon="icon-park-solid:back" />
                      </IconButton>
                    )}
                  </Stack>
                  <Divider sx={{ mb: 2 }} />
                  {breadCrumbsLink && <CustomBreadcrumbs sx={{ mb: 4 }} links={breadCrumbsLink} />}
                </>
                {children}
              </Box>
            )}
          </Stack>
        </Container>
      </MainLayout>
    </AuthGuard>
  );
}
