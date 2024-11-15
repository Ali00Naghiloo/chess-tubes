// @mui
import { Box, Table, TableBody } from '@mui/material';
// components
import Scrollbar from '@/components/scrollbar/Scrollbar';
import { TableHeadCustom, TableNoData } from '@/components/table';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'تاریخ و ساعت', align: 'left' },
  { id: 'createdAt', label: 'مبلغ (تومان)', align: 'left' },
  { id: 'inventoryType', label: 'نوغ تراکنش', align: 'left' },
  { id: 'price', label: 'توضیحات', align: 'left' },
  { id: '' },
];

const TABLE_DATA = [];

// ----------------------------------------------------------------------

export default function SampleTab() {
  return (
    <Box>
      <Scrollbar>
        <Table size="small">
          <TableHeadCustom headLabel={TABLE_HEAD} />
          <TableBody>
            <TableNoData title="تراکنشی یافت نشد" isNotFound={TABLE_DATA.length === 0} />
          </TableBody>
        </Table>
      </Scrollbar>
    </Box>
  );
}
