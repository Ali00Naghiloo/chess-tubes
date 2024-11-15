// @mui
import { Card, Divider, Link, Stack } from '@mui/material';
import Iconify from '@/components/iconify/Iconify';
import { useSelector } from '@/redux/store';

// ----------------------------------------------------------------------

export default function ContactUsSocial() {
  const { contact } = useSelector((s) => s.contact);

  return (
    <Stack direction={{ xs: 'column-reverse', sm: 'row' }} spacing={2} sx={{ mb: 10 }}>
      <Card
        sx={{ width: 'fit-content', px: 2, py: 0.5, borderColor: 'primary.main' }}
        variant="outlined"
        component={Stack}
        justifyContent="center"
        alignItems="center"
        direction="row"
        dir="rtl"
        spacing={1.5}
      >
        <Link color="inherit" href="/" variant="subtitle2">
          {contact?.email}
        </Link>
        <Divider orientation="vertical" sx={{ height: 20 }} />
        <Iconify sx={{ color: 'primary.main' }} icon="eva:email-fill" />
      </Card>
      <Card
        sx={{ width: 'fit-content', px: 2, py: 0.5, borderColor: 'lightBlue' }}
        variant="outlined"
        component={Stack}
        justifyContent="center"
        alignItems="center"
        direction="row"
        dir="rtl"
        spacing={1.5}
      >
        <Link color="inherit" href="/" variant="subtitle2">
          {contact?.telegram}
        </Link>
        <Divider orientation="vertical" sx={{ height: 20 }} />
        <Iconify icon="logos:telegram" />
      </Card>
    </Stack>
  );
}

// ----------------------------------------------------------------------
