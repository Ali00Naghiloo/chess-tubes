// next
import Link from 'next/link';
// @mui
import { Box, Card, Chip, Divider, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
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

export function TicketCard() {
  const { tickets } = useSelector((s) => s.ticket.tickets);

  return (
    <Grid
      container
      spacing={1}
      // rowGap={3}
      //  columnGap={2}
      // columnSpacing={1}
      // justifyContent="flex-start"
    >
      {tickets.map((t) => (
        <TicketCardItem key={t.ticketId} {...t} />
      ))}
    </Grid>
  );
}

// ----------------------------------------------------------------------

type TicketRowType = TicketItem;

function TicketCardItem({
  category,
  lastUpdateDate,
  status,
  ticketId,
  subject,
  state,
}: TicketRowType) {
  return (
    <Grid xs={12 / 1} sm={12 / 2}>
      <Link href={PATH_DASHBOARD.ticket(ticketId)}>
        <Card variant="outlined" sx={{ p: 1.5 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            sx={{ pb: 1 }}
            spacing={1}
          >
            <Typography
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: '2',
                WebkitBoxOrient: 'vertical',
                height: 37,
                lineHeight: 1.2,
              }}
              variant="subtitle1"
            >
              {category}
            </Typography>
            <Box>
              <Chip
                size="small"
                label={status}
                variant="filled"
                color={state === 'Open' ? 'info' : 'success'}
              />
            </Box>
          </Stack>
          <Typography
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: '2',
              WebkitBoxOrient: 'vertical',
              height: 37,
              lineHeight: 1.2,
            }}
            color="text.secondary"
            fontWeight={500}
            variant="subtitle2"
          >
            {subject}
          </Typography>
          <Divider sx={{ mb: 1 }} />
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography color="text.secondary" variant="caption">
              {fDateTime(Number(lastUpdateDate))}
            </Typography>
            <Typography color="text.secondary" variant="caption">
              شماره تیکت: {enNumToPer(ticketId)}
            </Typography>
          </Stack>
        </Card>
      </Link>
    </Grid>
  );
}
