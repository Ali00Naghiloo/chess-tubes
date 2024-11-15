// @mui
import { RHFTextField } from '@/components/hook-form';
import Iconify from '@/components/iconify/Iconify';
import { Grid, Paper, Stack, Typography } from '@mui/material';

// ----------------------------------------------------------------------

export default function CheckoutMainInfo() {
  return (
    <Paper variant="outlined" sx={{ py: 2, px: { sm: 2, md: 3, lg: 4, xs: 2 } }}>
      <Typography
        variant="h6"
        sx={{
          mb: 3,
          '&::before': { content: "'•'", color: 'primary.main', mr: 0.5 },
        }}
      >
        مشخصات کلی
      </Typography>

      <Grid container columnSpacing={{ sm: 4, md: 8, lg: 10, xs: 3 }} rowSpacing={3}>
        <Grid item xs={12} sm={12 / 2}>
          <RHFTextField
            name="name"
            InputLabelProps={{ shrink: true }}
            fullWidth
            size="small"
            label={
              <Stack dir="ltr" direction="row" alignContent="center" justifyContent="center">
                نام و نام خانوادگی
                <Iconify icon="mdi:user" sx={{ mr: 0.4 }} />
              </Stack>
            }
          />
        </Grid>

        <Grid item xs={12} sm={12 / 2}>
          <RHFTextField
            name="receiverName"
            InputLabelProps={{ shrink: true }}
            fullWidth
            size="small"
            label={
              <Stack dir="ltr" direction="row" alignContent="center" justifyContent="center">
                نام و نام خانوادگی گیرنده
                <Iconify icon="material-symbols:person-book-sharp" sx={{ mr: 0.4 }} />
              </Stack>
            }
          />
        </Grid>

        <Grid item xs={12} sm={12 / 2}>
          <RHFTextField
            name="phone"
            InputLabelProps={{ shrink: true }}
            fullWidth
            size="small"
            label={
              <Stack dir="ltr" direction="row" alignContent="center" justifyContent="center">
                شماره تلفن
                <Iconify icon="bi:phone-fill" sx={{ mr: 0.4 }} />
              </Stack>
            }
          />
        </Grid>

        <Grid item xs={12} sm={12 / 2}>
          <RHFTextField
            name="email"
            InputLabelProps={{ shrink: true }}
            fullWidth
            size="small"
            label={
              <Stack dir="ltr" direction="row" alignContent="center" justifyContent="center">
                ایمیل
                <Iconify icon="ic:baseline-email" sx={{ mr: 0.4 }} />
              </Stack>
            }
          />
        </Grid>
      </Grid>
    </Paper>
  );
}
