// @mui
import { PATH_PAGE } from '@/routes/paths';
import { Alert, AlertTitle, Link, Stack } from '@mui/material';

// ----------------------------------------------------------------------

export function NewTicketSide() {
  return (
    <Stack sx={{ width: { lg: 350, xs: '100%' } }}>
      <Alert severity="info">
        <AlertTitle>قبل از ارسال تیکت</AlertTitle>
        کاربر گرامی چس تیوبز چنانچه سوالی دارید می‌توانید با جستجو در قسمت
        <Link href={PATH_PAGE.faqs}> سوالات متداول </Link>
        پاسخ اکثر سوالات خود را بیابید ، در صورتیکه به پاسخ مورد نظر خود دست نیافتید می‌توانید از
        طریق ارسال تیکت با کارشناسان چس تیوبز در ارتباط باشید.
      </Alert>
    </Stack>
  );
}
