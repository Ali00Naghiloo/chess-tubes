import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
// next
import { useSearchParams } from 'next/navigation';
// @mui
import { Container } from '@mui/material';
// components
import PreLoader from '@/components/pre-loader';
// next
import { useRouter } from 'next/router';
// redux
import { useDispatch } from '@/redux/store';
// operators
import searchQuery from '@/modules/global/redux/operators/searchQuery';
//
import SearchWrapper from './SearchWrapper';

// ----------------------------------------------------------------------

export default function SearchSection() {
  const [isLoading, setIsLoading] = useState(true);

  const { isReady } = useRouter();

  const query = useSearchParams();

  const dispatch = useDispatch();

  const successCallback = () => {
    setIsLoading(false);
  };

  const failureCallback = (msg: string) => {
    toast.error(msg);
    setIsLoading(false);
  };

  useEffect(() => {
    if (isReady) {
      dispatch(
        searchQuery(
          query.get('type'),
          query.get('q') as string,
          query.get('pt'),
          successCallback,
          failureCallback
        )
      );
    }
  }, [dispatch, isReady, query]);

  return (
    <Container dir="rtl" sx={{ my: 7, mb: 10 }}>
      {isLoading && <PreLoader />}
      {!isLoading && <SearchWrapper />}
    </Container>
  );
}
