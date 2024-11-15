import { useEffect } from 'react';
// next
import { useRouter } from 'next/router';
// hooks
import { useSelector } from '@/redux/store';
// components
import LoadingScreen from '@/components/loading-screen/LoadingScreen';
import { PATH_PAGE } from '@/routes/paths';

// ----------------------------------------------------------------------

type GuestGuardProps = {
  children: any;
};

export default function GuestGuard({ children }: GuestGuardProps) {
  const { push } = useRouter();

  const { isAuthenticated, isInitialized, isRedirecting } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated && !isRedirecting) {
      push(PATH_PAGE.root);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  if (isAuthenticated === isInitialized) {
    return <LoadingScreen />;
  }

  return children;
}
