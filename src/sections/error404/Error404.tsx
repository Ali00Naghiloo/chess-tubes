// next
import NextLink from 'next/link';
// motion
import { MotionContainer, varBounce } from '@/components/animate';
import { m } from 'framer-motion';
// @mui
import { Button, Typography } from '@mui/material';
// illustration
import { PageNotFoundIllustration } from '@/assets/illustrations';
// hooks
import useResponsive from '@/hooks/useResponsive';

// ----------------------------------------------------------------------

export default function Error404() {
  const isPhone = useResponsive('down', 'sm');

  return (
    <MotionContainer>
      <m.div variants={varBounce().in}>
        <Typography variant={isPhone ? 'h4' : 'h3'} paragraph dir="rtl">
          صفحه مورد نظر، پیدا نشد!
        </Typography>
      </m.div>

      <m.div variants={varBounce().in}>
        <Typography sx={{ color: 'text.secondary' }} dir="rtl">
          متأسفیم، ما نتوانستیم صفحه مورد نظر شما را پیدا کنیم. شاید شما URL را اشتباه تایپ کرده .
          اید؟ درست بودن املای خود حتما را بررسی کنید
        </Typography>
      </m.div>

      <m.div variants={varBounce().in}>
        <PageNotFoundIllustration
          sx={{
            height: 400,
            width: '100%',
            my: { xs: 2, sm: 8 },
          }}
        />
      </m.div>

      <Button component={NextLink} href="/" disableElevation size="large" variant="contained">
        برگشت به خانه
      </Button>
    </MotionContainer>
  );
}
