// @mui
import { Box, Table, TableBody } from '@mui/material';
// components
import Scrollbar from '@/components/scrollbar/Scrollbar';
import { TableHeadCustom, TableNoData } from '@/components/table';
//
import { useSelector } from '@/redux/store';
import TransactionsTableRow from './TransactionTableRow';

const TABLE_HEAD = [
  { id: 'name', label: 'تاریخ و ساعت', align: 'left' },
  { id: 'createdAt', label: 'مبلغ (تومان)', align: 'left' },
  { id: 'inventoryType', label: 'نوغ تراکنش', align: 'left' },
  { id: 'price', label: 'توضیحات', align: 'left' },
  { id: '' },
];

// ----------------------------------------------------------------------

export default function TransactionsTab() {
  const data = useSelector((s) => s.walletTransactions);

  return (
    <Box>
      <Scrollbar>
        <Table size="small">
          <TableHeadCustom headLabel={TABLE_HEAD} />
          <TableBody>
            {data.data?.transactions.data.map((t) => (
              <TransactionsTableRow key={t.transaction_dt} {...t} />
            ))}

            <TableNoData
              title="تراکنشی یافت نشد"
              isNotFound={data.data?.transactions.data.length === 0}
            />
          </TableBody>
        </Table>
      </Scrollbar>
    </Box>
  );
}
