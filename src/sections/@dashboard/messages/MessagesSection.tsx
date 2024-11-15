import { messages } from '@/_mock/assets/messages';
import { fDateTime } from '@/utils/formatTime';
import { Avatar, Box, Divider, Stack, Typography } from '@mui/material';

// ----------------------------------------------------------------------

export default function MessagesSection() {
  return (
    <Box>
      <Stack direction="row" alignItems="center" spacing={1} sx={{ my: 2 }}>
        <Avatar sx={{ width: 70, height: 70 }} src="/assets/images/avatars/avatar_3.jpg" />
        <Stack>
          <Typography variant="h6">مدیریت چس تیوبز</Typography>
          <Typography variant="subtitle2">حسن زاده</Typography>
        </Stack>
      </Stack>
      {messages.map((m, i) => (
        <MessageItem key={m.id} {...m} isLast={i === messages.length - 1} />
      ))}
    </Box>
  );
}

// ----------------------------------------------------------------------

type MessageItemProps = {
  date: string | Date;
  message: string;
  isLast?: boolean;
};

function MessageItem({ date, message, isLast }: MessageItemProps) {
  return (
    <Box>
      <Stack
        direction={{ sm: 'row', xs: 'column' }}
        justifyContent="space-between"
        alignItems="center"
        spacing={{ sm: 0, xs: 1 }}
      >
        <Typography fontWeight={500}>{message}</Typography>
        <Typography sx={{ opacity: 0.6 }} alignSelf="flex-end">
          {fDateTime(date)}
        </Typography>
      </Stack>
      {!isLast && <Divider sx={{ my: 2 }} />}
    </Box>
  );
}
