import { useEffect, useState } from 'react';
// @mui
import { Container, LinearProgress, Stack } from '@mui/material';
// next
import { useRouter } from 'next/router';
// mock
import { CANCELED_ORDER, PENDING_FOR_PAY_ORDER, PROCESSING_ORDER } from '@/_mock/assets/order';
//
import Processing from './Processing';
import Failure from './Failure';

// ----------------------------------------------------------------------

const QUERY_MAPPER: any = {
  processing: PROCESSING_ORDER,
  canceled: CANCELED_ORDER,
  pending: PENDING_FOR_PAY_ORDER,
};

export default function OrderPaymentStatusSection() {
  //

  const [isLoading, setIsLoading] = useState(true);

  const { query, isReady } = useRouter();

  let order = null;

  useEffect(() => {
    if (isReady) {
      setIsLoading(false);
    }
  }, [isReady]);

  if (query.type == null) {
    order = PROCESSING_ORDER;
  }
  if (QUERY_MAPPER[query.type as string] != null) {
    order = QUERY_MAPPER[query.type as string];
  }

  return (
    <Container maxWidth="md" sx={{ mt: 2, mb: 10 }} dir="rtl">
      {isLoading && (
        <Stack justifyContent="center" sx={{ height: 300 }}>
          <LinearProgress />
        </Stack>
      )}
      {!isLoading && (
        <>
          {order.type === 'processing' && <Processing />}
          {order.type === 'pending' && <Failure />}
        </>
      )}
    </Container>
  );
}
