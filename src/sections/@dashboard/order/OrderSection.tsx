import { useEffect, useState } from 'react';
// next
import { useRouter } from 'next/router';
import { useParams } from 'next/navigation';
// @mui
import { Box, LinearProgress, Stack } from '@mui/material';
// redux
import { useDispatch, useSelector } from '@/redux/store';
// operators
import getOrder from '@/modules/order/redux/operators/getOrder';
// paths
import { PATH_PAGE } from '@/routes/paths';
//
import OrderCard from './OrderCard';

// ----------------------------------------------------------------------

export default function OrderSection() {
  const [isLoading, setIsLoading] = useState(true);

  const { order } = useSelector((s) => s.order);

  const params = useParams();

  const dispatch = useDispatch();

  const { isReady, push } = useRouter();

  const failureCallback = (err: any) => {
    if (`${err.status}` === '404') {
      push(PATH_PAGE.page404);
    }
    setIsLoading(false);
  };

  const successCallback = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    if (isReady) {
      const orderId = params.orderId as string;
      dispatch(getOrder(orderId, successCallback, failureCallback));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady, dispatch, params.orderId]);

  return (
    <Box>
      {isLoading && (
        <Stack justifyContent="center" sx={{ height: 300 }}>
          <LinearProgress />
        </Stack>
      )}
      {!isLoading && <OrderCard {...order} />}
    </Box>
  );
}
