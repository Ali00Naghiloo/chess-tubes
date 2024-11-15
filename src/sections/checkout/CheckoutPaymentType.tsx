import { useEffect, useState } from 'react';
// @mui
import { Checkbox, List, ListItem, ListItemButton, Paper, Stack, Typography } from '@mui/material';
// components
import Iconify from '@/components/iconify/Iconify';

// ----------------------------------------------------------------------

const PAYMENT_TYPE = [
  {
    icon: 'solar:card-bold-duotone',
    title: 'پرداخت اینترنتی',
    subtile: 'پرداخت با تمامی کارت های بانکی',
    id: 'gate',
  },
  {
    icon: 'solar:wallet-bold-duotone',
    title: 'پرداخت با کیف پول ',
    subtile: 'پرداخت از طریق کیف پول چس تیوبز',
    id: 'wallet',
  },
];

// ----------------------------------------------------------------------

export default function CheckoutPaymentType({ title = true }: { title?: boolean }) {
  const [paymentType, setPaymentType] = useState(PAYMENT_TYPE[0].id);

  useEffect(() => {
    sessionStorage.setItem('paymentType', paymentType);
  }, [paymentType]);

  return (
    <Paper variant="outlined" sx={{ py: 2, px: { sm: 2, md: 3, lg: 4, xs: 2 } }}>
      {title && (
        <Typography
          variant="h6"
          sx={{
            mb: 3,
            '&::before': { content: "'•'", color: 'primary.main', mr: 0.5 },
          }}
        >
          انتخاب نحوه پرداخت
        </Typography>
      )}

      <List>
        {PAYMENT_TYPE.map((t) => (
          <ListItem key={t.id} disablePadding>
            <ListItemButton onClick={() => setPaymentType(t.id)} disableRipple>
              <Stack direction="row" alignItems="center" justifyContent="flex-start">
                <Checkbox color="info" checked={t.id === paymentType} />
                <Stack alignItems="center" direction="row" spacing={1}>
                  <Iconify
                    icon={t.icon}
                    sx={{ color: t.id === paymentType ? 'info.main' : '', width: 40, height: 40 }}
                  />
                  <Stack>
                    <Typography sx={{ mt: 0.5 }} fontWeight={600}>
                      {t.title}
                    </Typography>

                    <Typography variant="body2" fontWeight={400}>
                      {t.subtile}
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}
