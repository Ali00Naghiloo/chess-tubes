import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
// redux
import { useDispatch, useSelector } from '@/redux/store';
// @mui
import { Box, LinearProgress, Paper, Stack, Tab, Tabs } from '@mui/material';
// operators
import getInprogressOrders from '@/modules/order/redux/operators/getInprogressOrders';
import getCompletedOrders from '@/modules/order/redux/operators/getCompletedOrders';
import getCancelledOrders from '@/modules/order/redux/operators/getCancelledOrders';
import getReturnedOrders from '@/modules/order/redux/operators/getReturnedOrders';
// utils
import { enNumToPer } from '@/utils/persianUtils';
// tabs
import InProgressTab from './tabs/InProgressTab';
import DeliveredTab from './tabs/DeliveredTab';
import CanceledTab from './tabs/CanceledTab';
import ReturnedTab from './tabs/ReturnedTab';

// ----------------------------------------------------------------------

const TABS = [
  {
    value: 'inprogress',
    label: 'جاری',
    component: <InProgressTab />,
    number: '0',
  },
  {
    value: 'completed',
    label: 'تحویل شده',
    component: <DeliveredTab />,
    number: '0',
  },
  {
    value: 'cancelled',
    label: 'لغو شده',
    component: <CanceledTab />,
    number: '0',
  },
  {
    value: 'returned',
    label: 'مرجوعی ها',
    component: <ReturnedTab />,
    number: '0',
  },
];

const makeTabs = (obj: any) => {
  if (obj != null) {
    return TABS.map((t) => ({ ...t, number: obj[t.value].data.length }));
  }
  return TABS;
};

// ----------------------------------------------------------------------

export default function OrdersSection() {
  //
  const [currentTab, setCurrentTab] = useState('inprogress');

  const [isLoading, setIsLoading] = useState(true);

  const { orders } = useSelector((s) => s.order);

  const dispatch = useDispatch();

  const failureCallback = (msg: string) => {
    setIsLoading(false);
    toast.error(msg);
  };

  const successCallback = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    dispatch(getInprogressOrders('', () => {}, failureCallback));
    dispatch(getCompletedOrders('', () => {}, failureCallback));
    dispatch(getCancelledOrders('', () => {}, failureCallback));
    dispatch(getReturnedOrders('', successCallback, failureCallback));
  }, [dispatch]);

  return (
    <>
      {isLoading && (
        <Stack justifyContent="center" sx={{ height: 300 }}>
          <LinearProgress />
        </Stack>
      )}

      {!isLoading && (
        <Paper variant="outlined">
          <Tabs
            dir="rtl  "
            value={currentTab}
            onChange={(_, newValue) => {
              setCurrentTab(newValue);
            }}
            variant="scrollable"
            scrollButtons={false}
            sx={{ borderBottom: 1, borderColor: 'grey.200' }}
          >
            {makeTabs(orders).map((tab) => (
              <Tab
                key={tab.value}
                label={
                  <Stack direction="row" spacing={1} alignItems="center">
                    {tab.label}
                    <Box />
                    <Box
                      sx={{
                        bgcolor: 'grey.100',
                        px: 0.5,
                        borderRadius: 1,
                      }}
                    >
                      {enNumToPer(tab.number)}
                    </Box>
                  </Stack>
                }
                value={tab.value}
                iconPosition="start"
              />
            ))}
          </Tabs>

          {makeTabs(orders).map(
            (tab) =>
              tab.value === currentTab && (
                <Box key={tab.value} sx={{ my: { md: 5, xs: 2 }, px: { md: 2, xs: 0 } }}>
                  {tab.component}
                </Box>
              )
          )}
        </Paper>
      )}
    </>
  );
}
