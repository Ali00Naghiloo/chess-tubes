// @mui
import { Card, Stack, Typography, alpha } from '@mui/material';
// redux
import { useSelector } from '@/redux/store';
// utils
import { fDateTime } from '@/utils/formatTime';
// model
import { TicketChatReply } from '@/modules/ticket/models/ticket';
import { User } from '@/modules/user/models/user';

// ----------------------------------------------------------------------

type ChatMessageItemType = TicketChatReply;

export default function TicketMessageItem({ reply, user_id, created_at }: ChatMessageItemType) {
  const { id } = useSelector((s) => s.user.user as User);

  const currentUser = Number(id) === Number(user_id);

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems={currentUser ? 'flex-start' : 'flex-end'}
      sx={{ mb: 3 }}
    >
      <Card
        variant="outlined"
        sx={{
          p: 1,
          bgcolor: 'background.neutral',
          ...(currentUser && {
            color: 'grey.800',
            bgcolor: (t) => alpha(t.palette.primary.light, 0.4),
          }),
        }}
      >
        <Stack spacing={1} alignItems="flex-start">
          <Stack
            sx={{
              p: 1.5,
              minWidth: 48,
              maxWidth: 320,
              borderRadius: 1,
              overflow: 'hidden',
              typography: 'body2',
            }}
          >
            <Typography fontWeight={500}>{reply}</Typography>
          </Stack>
          <Typography
            noWrap
            variant="caption"
            sx={{
              color: 'text.disabled',
              ...(!currentUser && {
                mr: 'auto',
              }),
            }}
          >
            {!currentUser} &nbsp;
            {fDateTime(Number(created_at))}
          </Typography>
        </Stack>
      </Card>
    </Stack>
  );
}
