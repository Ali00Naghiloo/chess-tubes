// @mui
import { Divider, Stack } from '@mui/material';
// hooks
import useResponsive from '@/hooks/useResponsive';
// redux
import { useSelector } from '@/redux/store';
// operators
//
import Empty from './Empty';
import ReturnedCard from './cards/ReturnedCard';

// ----------------------------------------------------------------------

export default function ReturnedTab() {
  //
  const isDesktop = useResponsive('up', 'md');

  const {
    returned: { data },
  } = useSelector((s) => s.order.orders);

  return (
    <Stack spacing={isDesktop ? 6 : 2} divider={!isDesktop && <Divider />}>
      {data.length !== 0 && data.map((i) => <ReturnedCard {...i} key={i.orderId} />)}

      {data.length === 0 && <Empty />}
    </Stack>
  );
}
