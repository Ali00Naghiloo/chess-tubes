// @mui
import { LinearProgress, Stack } from '@mui/material';
//
import { useEffect, useState } from 'react';
import { useDispatch } from '@/redux/store';
import getWalletTransactions from '@/modules/wallet/redux/operators/getWalletTransactions';
import BankingTransactions from './BankingTransactions';
import BankingBalance from './BankingBalance';

// ----------------------------------------------------------------------

export default function BankingSection() {
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWalletTransactions(() => setIsLoading(false)));
  }, [dispatch]);

  if (isLoading)
    return (
      <Stack justifyContent="center" sx={{ height: 300 }}>
        <LinearProgress />
      </Stack>
    );

  return (
    <Stack spacing={4}>
      <BankingBalance />
      <BankingTransactions />
    </Stack>
  );
}
