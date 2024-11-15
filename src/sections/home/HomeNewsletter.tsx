// @mui
import { Container, Stack, Typography, useTheme } from '@mui/material';

// components
import SubscribeNewsletterForm from '@/components/subscribe-newsletter/SubscribeNewsletterForm';
import ChessNewsSub from '@/assets/icons/ChessNewsSub';

// ----------------------------------------------------------------------

export default function HomeNewsletter() {
  //
  const {
    palette: { mode },
  } = useTheme();

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      dir="ltr"
      sx={{
        // bgcolor: (theme) => alpha(theme.palette.grey[200], mode === 'dark' ? 0.1 : 0.4),
        bgcolor: (theme) => (mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800]),
        py: 2,
        px: { lg: 12, xs: 2 },
      }}
    >
      <ChessNewsSub sx={{ width: 150, display: { lg: 'flex', xs: 'none' } }} />

      <Container>
        <Stack direction="column" justifyContent="center" alignItems="flex-start" dir="rtl">
          <Stack sx={{ width: 'auto' }}>
            <Typography variant="h4" fontWeight={800} sx={{ mb: 2 }}>
              عضویت در خبرنامه
            </Typography>
            <Typography variant="subtitle2" sx={{ opacity: 0.7 }}>
              با عضویت در خبرنامه چس تیوبز از جدید ترین رویداد های <br /> شطرنج در سطح بین المللی و
              داخلی با خبر شوید
            </Typography>
          </Stack>

          <Stack
            direction="row"
            sx={{ pt: 6 }}
            justifyContent="center"
            alignItems="flex-start"
            dir="rtl"
            spacing={2}
          >
            <SubscribeNewsletterForm />
          </Stack>
        </Stack>
      </Container>
    </Stack>
  );
}
