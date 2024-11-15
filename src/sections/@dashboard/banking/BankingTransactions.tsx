// @mui
import { Box, Paper, Typography } from '@mui/material';
import TransactionsTab from './tabs/TransactionsTab';

export default function BankingTransactions() {
  return (
    <Paper variant="outlined" sx={{ py: 2, px: { sm: 2, md: 3, lg: 4, xs: 2 } }}>
      <Typography
        variant="h6"
        sx={{
          mb: 2,
          '&::before': { content: "'•'", color: 'primary.main', mr: 0.5 },
        }}
      >
        تراکنش ها
      </Typography>

      <Box sx={{ my: 2, px: { md: 2, xs: 0 } }}>
        <TransactionsTab />
      </Box>
    </Paper>
  );
}
