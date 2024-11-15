import { useEffect, useState } from 'react';
// next
import { useRouter } from 'next/router';
import { useParams } from 'next/navigation';
// @mui
import { Container, LinearProgress, Stack } from '@mui/material';
// hooks
import useResponsive from '@/hooks/useResponsive';
// redux
import { useDispatch } from '@/redux/store';
// paths
import { PATH_PAGE } from '@/routes/paths';
// modules
import getNews from '@/modules/news/redux/operators/getNews';
//
import NewContent from './NewContent';
import NewImportantNews from './NewImportantNews';

// ----------------------------------------------------------------------

export default function NewSection() {
  const isMobile = useResponsive('down', 'md');

  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  const { push, isReady } = useRouter();

  const params = useParams();

  const successCallback = () => {
    setIsLoading(false);
  };

  const errorCallback = (err: any) => {
    if (`${err.status}` === '404') {
      push(PATH_PAGE.page404);
    }
  };

  useEffect(() => {
    if (isReady) {
      dispatch(getNews(`${params.new_id}`, successCallback, errorCallback));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, isReady]);

  return (
    <Container
      dir="rtl"
      sx={{
        my: 7,
        mb: 10,
      }}
    >
      {isLoading && (
        <Stack justifyContent="center" sx={{ height: 300 }}>
          <LinearProgress />
        </Stack>
      )}
      {!isLoading && (
        <Stack direction="row" justifyContent="space-between" spacing={4}>
          <NewContent />
          {!isMobile && <NewImportantNews />}
        </Stack>
      )}
    </Container>
  );
}
