// @mui
import { Stack, Typography } from '@mui/material';
import Iconify from '@/components/iconify/Iconify';
import { useSelector } from '@/redux/store';

// ----------------------------------------------------------------------

export default function ContactUsMainInfo() {
  const { contact } = useSelector((s) => s.contact);

  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={1}>
        <Iconify sx={{ color: (theme) => theme.palette.primary.main }} icon="eva:inbox-fill" />
        <Typography variant="subtitle1">صندوق پستی: {contact?.postalCode}</Typography>
      </Stack>
      <Stack direction="row" spacing={1}>
        <Iconify sx={{ color: (theme) => theme.palette.primary.main }} icon="eva:phone-fill" />
        <Typography variant="subtitle1">شماره تماس: {contact?.tel}</Typography>
      </Stack>
    </Stack>
  );
}
