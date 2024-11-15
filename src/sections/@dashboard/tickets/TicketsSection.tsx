import { ChangeEvent, useEffect, useState } from 'react';
// @mui
import { Button, Pagination, Stack } from '@mui/material';
import { Add } from '@mui/icons-material';
// components
import PreLoader from '@/components/pre-loader';
// redux
import { useDispatch, useSelector } from '@/redux/store';
// operators
import getTickets from '@/modules/ticket/redux/operators/getTickets';
// utils
import { PATH_DASHBOARD } from '@/routes/paths';
// hooks
import useResponsive from '@/hooks/useResponsive';
import { TicketTable } from './TicketTable';
import { TicketCard } from './TicketCard';

// ----------------------------------------------------------------------

export default function TicketsSection() {
  //
  const isMobile = useResponsive('down', 'sm');

  const isTablet = useResponsive('down', 'lg');

  const [isLoading, setIsLoading] = useState(true);

  const {
    meta: { current_page, last_page },
  } = useSelector((s) => s.ticket.tickets);

  const [page, setPage] = useState(current_page);

  const dispatch = useDispatch();

  const failureCallback = () => {
    setIsLoading(false);
  };

  const successCallback = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams();
    searchParams.append('page', page.toString());
    setIsLoading(true);
    dispatch(getTickets(searchParams.toString(), successCallback, failureCallback));
  }, [dispatch, page]);

  const handleChangePagination = (_: ChangeEvent<unknown>, pageNum: number) => {
    setPage(pageNum);
  };

  return (
    <>
      {isLoading && <PreLoader />}
      {!isLoading && (
        <Stack spacing={5}>
          <Stack justifyContent="flex-start" alignItems="flex-end">
            <Button
              variant="contained"
              disableElevation
              href={PATH_DASHBOARD.newTicket}
              endIcon={<Add />}
            >
              ارسال تیکت جدید
            </Button>
          </Stack>

          {!isTablet && <TicketTable />}
          {isTablet && <TicketCard />}

          <Stack justifyContent="center" alignItems="center" sx={{ mt: 8 }}>
            <Pagination
              count={Number(last_page)}
              defaultPage={Number(current_page)}
              page={Number(page)}
              dir="rtl"
              onChange={handleChangePagination}
              size={isMobile ? 'small' : 'large'}
              shape="rounded"
              color="darkPrimary"
            />
          </Stack>
        </Stack>
      )}
    </>
  );
}
