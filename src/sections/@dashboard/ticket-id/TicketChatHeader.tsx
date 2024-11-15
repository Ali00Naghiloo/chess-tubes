import { toast } from 'react-toastify';
// @mui
import { Button, Stack, Typography } from '@mui/material';
// redux
import { useDispatch, useSelector } from '@/redux/store';
// operators
import closeTicket from '@/modules/ticket/redux/operators/closeTicket';

// ----------------------------------------------------------------------

export default function TicketChatHeader() {
  const {
    ticket: { subject, id },
    ticketState,
  } = useSelector((s) => s.ticket.ticket);

  const { isClosing } = useSelector((s) => s.ticket.ticketOperationStates);

  const dispatch = useDispatch();

  const successCallback = (msg: string) => {
    toast.success(msg);
  };

  const failureCallback = (msg: string) => {
    toast.error(msg);
  };

  const closeTicketHandle = () => {
    dispatch(closeTicket(`${id}`, successCallback, failureCallback));
  };

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ borderBottom: 1, borderColor: 'divider', px: 2, py: 2 }}
    >
      <Typography
        sx={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: '1',
          WebkitBoxOrient: 'vertical',
        }}
        fontWeight={500}
        variant="subtitle1"
      >
        {subject}
      </Typography>
      <Button
        onClick={closeTicketHandle}
        disabled={ticketState === 'Closed' || isClosing}
        variant="outlined"
      >
        بستن تیکت
      </Button>
    </Stack>
  );
}
