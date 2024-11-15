import { toast } from 'react-toastify';
import { useState } from 'react';
// @mui
import { IconButton, InputBase, Stack } from '@mui/material';
// components
import Iconify from '@/components/iconify';
// redux
import { useDispatch, useSelector } from '@/redux/store';
// operators
import sendMessage from '@/modules/ticket/redux/operators/sendMessage';

// ----------------------------------------------------------------------

export default function TicketMessageInput() {
  //

  const {
    ticketState,
    ticket: { id },
  } = useSelector((s) => s.ticket.ticket);

  const { isClosing } = useSelector((s) => s.ticket.ticketOperationStates);

  const [isLoading, setIsLoading] = useState(false);

  const [message, setMessage] = useState('');

  const dispatch = useDispatch();

  // const handleSend = (event: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (event.key === 'Enter') {
  //     send();
  //   }
  // };

  const successCallback = (msg: string) => {
    toast.success(msg);
    setIsLoading(false);
  };

  const failureCallback = (msg: string) => {
    toast.error(msg);
    setIsLoading(false);
  };

  const send = () => {
    if (ticketState === 'Closed') {
      toast.error('تیکت بسته میباشد!');
      return;
    }
    if (isLoading) {
      return;
    }
    if (message.trim().replace(/\n/g, '') === '') {
      toast.error('پیام نمیتواند خالی باشد!');
    } else {
      setIsLoading(true);
      dispatch(sendMessage(`${id}`, message, successCallback, failureCallback));
      setMessage('');
    }
  };

  return (
    <InputBase
      multiline
      rows={5}
      value={message}
      // onKeyUp={handleSend}
      disabled={ticketState === 'Closed' || isLoading || isClosing}
      onChange={(event) => setMessage(event.target.value)}
      placeholder={ticketState === 'Closed' ? 'این تیکت بسته شده است' : 'پیام خود را تایپ کنید...'}
      endAdornment={
        <Stack direction="row" spacing={1} sx={{ flexShrink: 0, mr: 1.5 }}>
          <IconButton size="small" onClick={send}>
            <Iconify sx={{ transform: 'rotate(180deg)' }} icon="basil:send-solid" />
          </IconButton>
        </Stack>
      }
      sx={{
        pl: 5,
        pr: 2,
        pt: 2,
        flexShrink: 0,
        borderTop: (theme) => `solid 1px ${theme.palette.divider}`,
      }}
    />
  );
}
