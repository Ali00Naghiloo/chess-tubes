import { useState } from 'react';
// next
import dynamic from 'next/dynamic';
// hooks
import useResponsive from '@/hooks/useResponsive';
// @mui
import { Box } from '@mui/material';
// Header
// import Header from './header';
// nav
// import NavbarHorizontal from './nav/NavbarHorizontal';
// footer
// import Footer from './footer';
// import Search from './header/Search';
import NavVertical from './nav/NavVertical';

// ----------------------------------------------------------------------

const Header = dynamic(() => import('./header'), {
  ssr: false,
  // TODO implement skeleton
  // loading: () => <p>loading</p>,
});

const NavbarHorizontal = dynamic(() => import('./nav/NavbarHorizontal'), {
  ssr: false,
  // TODO implement skeleton
  // loading: () => <p>loading</p>,
});

const Footer = dynamic(() => import('./footer'), {
  ssr: false,
  // TODO implement skeleton
  // loading: () => <p>loading</p>,
});

const Search = dynamic(() => import('./search'), {
  ssr: false,
  // loading: () => <p>loading</p>,
});

// ----------------------------------------------------------------------

type MainLayoutProps = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  const isDesktop = useResponsive('up', 'md');

  const [openNav, setOpenNav] = useState(false);

  const [openSearch, setOpenSearch] = useState(false);

  const handleOpenSearch = () => setOpenSearch(true);

  const handleCloseSearch = () => {
    setOpenSearch(false);
  };

  const handleOpenNav = () => {
    setOpenNav(true);
  };

  const handleCloseNav = () => {
    setOpenNav(false);
  };

  const renderNavVertical = <NavVertical openNav={openNav} onCloseNav={handleCloseNav} />;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {openSearch && <Search openSearch={openSearch} onCloseSearch={handleCloseSearch} />}

      <Header onOpenNav={handleOpenNav} onOpenSearch={handleOpenSearch} />

      {isDesktop ? <NavbarHorizontal /> : renderNavVertical}

      <Box component="main" sx={{ pt: { xs: 10, md: 16 } }}>
        {children}
      </Box>

      {/* <Fab color="primary" size="large" sx={{ position: 'fixed', bottom: 50, left: 50 }}>
        <Support />
      </Fab> */}

      <Footer />
    </Box>
  );
}
