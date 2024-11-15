import { useRouter } from 'next/router';
import { useEffect } from 'react';
// routes
import { PATH_PAGE } from '@/routes/paths';

// ----------------------------------------------------------------------

export default function Index() {
  const { push, pathname } = useRouter();

  useEffect(() => {
    if (pathname === PATH_PAGE.news.root) {
      push(PATH_PAGE.news.internalNews);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return null;
}
