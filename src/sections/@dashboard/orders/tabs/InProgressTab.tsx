// @mui
import { Divider, Stack } from '@mui/material';
// hooks
import useResponsive from '@/hooks/useResponsive';
// redux
import { useSelector } from '@/redux/store';
// operators
//
import Empty from './Empty';
import PreparingCard from './cards/PreparingCard';

// ----------------------------------------------------------------------

export default function InProgressTab() {
  //
  const isDesktop = useResponsive('up', 'md');

  const {
    inprogress: { data },
  } = useSelector((s) => s.order.orders);

  return (
    <Stack spacing={isDesktop ? 6 : 2} divider={!isDesktop && <Divider />}>
      {data.length !== 0 && data.map((i) => <PreparingCard {...i} key={i.orderId} />)}

      {data.length === 0 && <Empty />}
    </Stack>
  );
}
