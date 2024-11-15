import { ChangeEvent, useState } from 'react';
import { toast } from 'react-toastify';
// @mui
import { Container, Divider, LinearProgress, Pagination, Stack } from '@mui/material';
// hooks
import useResponsive from '@/hooks/useResponsive';
// redux
import { useDispatch, useSelector } from '@/redux/store';
// operators
import getCancelledOrders from '@/modules/order/redux/operators/getCancelledOrders';
//
import Empty from './Empty';
import CanceledCard from './cards/CanceledCard';

// ----------------------------------------------------------------------

export default function CanceledTab() {
  //
  const isDesktop = useResponsive('up', 'md');

  const {
    cancelled: { data, meta },
  } = useSelector((s) => s.order.orders);

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const [page, setPage] = useState(meta.current_page);

  const successCallback = () => {
    setIsLoading(false);
  };

  const failureCallback = (msg: string) => {
    toast.error(msg);
    setIsLoading(false);
  };

  const handleChangePagination = (_: ChangeEvent<unknown>, pageNum: number) => {
    setPage(pageNum);
    const searchParams = new URLSearchParams();
    searchParams.append('page', pageNum.toString());
    setIsLoading(true);
    dispatch(getCancelledOrders(searchParams.toString(), successCallback, failureCallback));
  };

  return (
    <Stack spacing={isDesktop ? 6 : 2} divider={!isDesktop && <Divider />}>
      {isLoading && (
        <Container>
          <Stack justifyContent="center" sx={{ height: 300 }}>
            <LinearProgress />
          </Stack>
        </Container>
      )}

      {!isLoading && (
        <>
          {data.length !== 0 &&
            data.map((i) => (
              <>
                <CanceledCard {...i} key={i.orderId} />

                <Stack justifyContent="center" alignItems="center" sx={{ mt: 8 }}>
                  <Pagination
                    count={Number(meta.last_page)}
                    defaultPage={Number(meta.current_page)}
                    page={Number(page)}
                    dir="rtl"
                    onChange={handleChangePagination}
                    size={!isDesktop ? 'small' : 'large'}
                    shape="rounded"
                    color="primary"
                  />
                </Stack>
              </>
            ))}

          {data.length === 0 && <Empty />}
        </>
      )}
    </Stack>
  );
}
