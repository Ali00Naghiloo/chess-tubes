// @mui
import { Box, Table, TableBody } from '@mui/material';
// components
import Scrollbar from '@/components/scrollbar/Scrollbar';
import { TableHeadCustom, TableNoData } from '@/components/table';
//
import WithdrawalRequestTableRow from './WithdrawalRequestTableRow';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'date', label: 'تاریخ و ساعت', align: 'left' },
  { id: 'price', label: 'مبلغ (تومان)', align: 'left' },
  { id: 'description', label: 'وضعیت', align: 'left' },
  { id: '' },
];

const TABLE_DATA = [
  {
    id: '1',
    date: new Date(),
    price: '۱،۵۳۰،۰۰۰',
    description: 'در حال بررسی درخواست انجام شده',
  },
  {
    id: '2',
    date: new Date(),
    price: '۲۰۰،۰۰۰',
    description: 'درخواست بدلیل قطع شدن شبکه بانکی رد شد',
  },
];

// ----------------------------------------------------------------------

export default function WithdrawalRequestTab() {
  return (
    <Box>
      <Scrollbar>
        <Table size="small">
          <TableHeadCustom headLabel={TABLE_HEAD} />
          <TableBody>
            {TABLE_DATA.map((t) => (
              <WithdrawalRequestTableRow key={t.id} {...t} />
            ))}

            <TableNoData title="تراکنشی یافت نشد" isNotFound={TABLE_DATA.length === 0} />
          </TableBody>
        </Table>
      </Scrollbar>
    </Box>
  );
}
