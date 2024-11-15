// @mui
import { Button, Table, TableBody, TableCell, TableRow } from '@mui/material';
import { MoreHoriz } from '@mui/icons-material';
// components
import Scrollbar from '@/components/scrollbar';
import { TableHeadCustom, TableNoData } from '@/components/table';
// redux
import { useSelector } from '@/redux/store';
// models
import { TicketItem } from '@/modules/ticket/models/ticket';
// utils
import { fDateTime } from '@/utils/formatTime';
import { enNumToPer } from '@/utils/persianUtils';
// paths
import { PATH_DASHBOARD } from '@/routes/paths';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: 'شماره تیکت', align: 'left' },
  { id: 'category', label: 'موضوض تیکت', align: 'left' },
  { id: 'lastUpdate', label: 'تاریخ آخرین پیام', align: 'left' },
  { id: 'status', label: 'وضعیت تیکت ', align: 'left' },
  { id: 'op', label: 'عملیات ', align: 'left' },
  { id: '' },
];

// ----------------------------------------------------------------------

export function TicketTable() {
  const { tickets } = useSelector((s) => s.ticket.tickets);

  return (
    <Scrollbar>
      <Table size="small">
        <TableHeadCustom headLabel={TABLE_HEAD} />
        <TableBody>
          {tickets.map((t) => (
            <TicketRow key={t.ticketId} {...t} />
          ))}

          <TableNoData title="تیکتی یافت نشد!" isNotFound={tickets.length === 0} />
        </TableBody>
      </Table>
    </Scrollbar>
  );
}

// ----------------------------------------------------------------------

type TicketRowType = TicketItem;

function TicketRow({
  category,
  lastUpdateDate,
  status,
  ticketId, // createData,
  // state,
} // subject,
: TicketRowType) {
  return (
    <TableRow sx={{ width: '100%' }}>
      <TableCell>{enNumToPer(ticketId)}</TableCell>
      <TableCell>{category}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{fDateTime(Number(lastUpdateDate))}</TableCell>
      <TableCell>{status}</TableCell>
      <TableCell>
        <Button
          href={PATH_DASHBOARD.ticket(ticketId)}
          sx={{ opacity: 0.7 }}
          color="inherit"
          endIcon={<MoreHoriz />}
        >
          جزییات
        </Button>
      </TableCell>
      <TableCell />
    </TableRow>
  );
}
