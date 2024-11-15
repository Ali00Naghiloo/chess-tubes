import { useEffect, useState } from 'react';
// next
import { useRouter } from 'next/router';
// hooks
import { useSelector } from '@/redux/store';
// components
import LoadingScreen from '@/components/loading-screen/LoadingScreen';
// routes
import { PATH_AUTH } from '@/routes/paths';

// ----------------------------------------------------------------------

type AuthGuardProps = {
  children: any;
};

export default function AuthGuard({ children }: AuthGuardProps) {
  const { pathname, push } = useRouter();

  const { isAuthenticated, isInitialized } = useSelector((state) => state.user);

  const [requestedLocation, setRequestedLocation] = useState<string | null>(null);
  useEffect(() => {
    if (requestedLocation && pathname !== requestedLocation) {
      push(requestedLocation);
    }
    if (isAuthenticated) {
      setRequestedLocation(null);
    }
  }, [isAuthenticated, pathname, push, requestedLocation]);

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    push(PATH_AUTH.login);
    return null;
  }

  return <> {children} </>;
}
