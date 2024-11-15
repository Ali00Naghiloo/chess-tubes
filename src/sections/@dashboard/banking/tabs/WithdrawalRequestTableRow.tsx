// @mui
import { TableCell, TableRow, Typography, alpha } from '@mui/material';
// utils
import { fDate } from '@/utils/formatTime';
import { enNumToPer } from '@/utils/persianUtils';

// ----------------------------------------------------------------------

type Props = {
  id: string | number;
  date: Date;
  price: number | string;
  description: string;
};

export default function WithdrawalRequestTableRow({ date, description, price, id }: Props) {
  return (
    <TableRow sx={{ width: '100%' }}>
      <TableCell>{fDate(date)}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>
        <Typography
          fontWeight={500}
          sx={{
            bgcolor: (t) => alpha(t.palette.error.light, 0.3),
            color: 'error.dark',
            textAlign: 'center',
            borderRadius: 2,
          }}
        >
          {enNumToPer(price)} -
        </Typography>
      </TableCell>
      <TableCell>{description}</TableCell>
      <TableCell />
    </TableRow>
  );
}
