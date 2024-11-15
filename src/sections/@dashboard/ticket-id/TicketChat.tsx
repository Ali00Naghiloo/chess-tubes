import { useEffect, useRef } from 'react';
// @mui
import { Card, Stack } from '@mui/material';
// components
import Scrollbar from '@/components/scrollbar';
// redux
import { useSelector } from '@/redux/store';
//
import TicketMessageItem from './TicketMessageItem';
import TicketMessageInput from './TicketMessageInput';
import TicketChatHeader from './TicketChatHeader';

// ----------------------------------------------------------------------

export default function TicketChat() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const { replies } = useSelector((s) => s.ticket.ticket);

  useEffect(() => {
    const scrollMessagesToBottom = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    };
    scrollMessagesToBottom();
  }, [replies, replies.length]);

  return (
    <Card variant="outlined" sx={{ height: '85vh' }} component={Stack}>
      <TicketChatHeader />
      <Scrollbar
        scrollableNodeProps={{
          ref: scrollRef,
        }}
        sx={{ p: 3, height: 1 }}
      >
        {replies.map((message) => (
          <TicketMessageItem key={message.id} {...message} />
        ))}
      </Scrollbar>
      <TicketMessageInput />
    </Card>
  );
}
