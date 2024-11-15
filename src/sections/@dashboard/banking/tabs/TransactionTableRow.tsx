// @mui
import { TableCell, TableRow, Typography, alpha } from '@mui/material';
// utils
import { fDate } from '@/utils/formatTime';
import { enNumToPer } from '@/utils/persianUtils';
import { TransactionType } from '@/modules/wallet/models/wallet';

// ----------------------------------------------------------------------

interface Props {
  transaction_dt: string;
  transaction_type: TransactionType;
  amount: number;
  description: string;
}

const translateTypes: Record<TransactionType, string> = {
  charge: 'شارژ',
  withdraw: 'برداشت',
  income: 'درآمد',
  payment: 'خرید',
};

export default function TransactionsTableRow({
  transaction_dt,
  description,
  amount,
  transaction_type,
}: Props) {
  return (
    <TableRow sx={{ width: '100%' }}>
      <TableCell>{fDate(transaction_dt)}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>
        <Typography
          fontWeight={500}
          sx={{
            bgcolor: (t) =>
              alpha(amount < 0 ? t.palette.error.light : t.palette.success.light, 0.3),
            color: amount < 0 ? 'error.dark' : 'success.dark',
            textAlign: 'center',
            borderRadius: 2,
          }}
        >
          {enNumToPer(amount)} {amount < 0 ? '-' : '+'}
        </Typography>
      </TableCell>
      <TableCell>{translateTypes[transaction_type]}</TableCell>
      <TableCell>{description}</TableCell>
      <TableCell />
    </TableRow>
  );
}
