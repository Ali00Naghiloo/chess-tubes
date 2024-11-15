import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';
// eslint-disable-next-line import/no-extraneous-dependencies
import Lottie from 'lottie-react';
import { Paper, Typography, Button, Container, Stack, LinearProgress } from '@mui/material';

import error from '@/../public/assets/lotties/error-payment.json';
import checked from '@/../public/assets/lotties/checked-payment.json';
import axiosInstance from '@/utils/axios';
import NextLink from 'next/link';
import { MotionContainer, varBounce } from '@/components/animate';
import { m } from 'framer-motion';

import useResponsive from '@/hooks/useResponsive';
import LoadingScreen from '@/components/loading-screen';

export default function CheckPayment() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<{
    message?: string;
    status?: boolean;
    data?: {
      payRefId: string;
      transactionType: 'payment' | 'charge';
    };
  }>({});

  const { query, isReady, push } = useRouter();

  const isPhone = useResponsive('down', 'sm');

  const { Authority, Status } = query as {
    Authority: string;
    Status: string;
  };

  useEffect(() => {
    if (isReady && (!Authority || !Status)) push('/404');
  }, [Authority, Status, isReady, push]);

  useEffect(() => {
    if (Status !== 'OK') return;
    setIsLoading(true);
    const getPaymentData = async () => {
      try {
        const { data: res } = await axiosInstance.post('api/payment/check', {
          authority: Authority,
          status: Status,
        });
        setData(res);
      } catch (err) {
        setData(err);
      }
      setIsLoading(false);
    };
    getPaymentData();
  }, [Authority, Status]);

  if (!isReady) return <LoadingScreen />;

  if (Status === 'NOK')
    return (
      <Paper
        variant="outlined"
        sx={{ py: 2, px: { sm: 2, md: 3, lg: 4, xs: 2 } }}
        style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}
      >
        <MotionContainer margin="auto">
          <m.div variants={varBounce().in}>
            <Typography variant={isPhone ? 'h4' : 'h3'} paragraph dir="rtl">
              پرداخت با خطا مواجه شد
            </Typography>
          </m.div>

          <m.div variants={varBounce().in}>
            <Lottie animationData={error} loop={false} width="350px" />
          </m.div>

          <Button component={NextLink} href="/" disableElevation size="large" variant="contained">
            بازگشت به صفحه اصلی
          </Button>
        </MotionContainer>
      </Paper>
    );

  return (
    <Paper
      variant="outlined"
      sx={{ py: 2, px: { sm: 2, md: 3, lg: 4, xs: 2 } }}
      style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}
    >
      {isLoading ? (
        <Container>
          <Stack justifyContent="center" sx={{ height: 300 }}>
            <LinearProgress />
          </Stack>
        </Container>
      ) : (
        <MotionContainer margin="auto">
          <m.div variants={varBounce().in}>
            <Typography variant={isPhone ? 'h4' : 'h3'} paragraph dir="rtl">
              {data.message || 'پرداخت با موفقیت انجام شد'}
            </Typography>
          </m.div>

          <m.div variants={varBounce().in}>
            <Lottie
              animationData={
                data?.message === 'فرآیند پرداخت با خطا مواجه شده است.' ? error : checked
              }
              loop={false}
              width="350px"
              height={400}
            />
          </m.div>

          <Button
            component={NextLink}
            href={
              data.data?.transactionType === 'charge' ? '/dashboard/banking' : '/dashboard/account'
            }
            disableElevation
            size="large"
            variant="contained"
          >
            {data.data?.transactionType === 'charge' ? 'رفتن کیف پول' : 'رفتن به تاریخجه سفارشات'}
          </Button>
        </MotionContainer>
      )}
    </Paper>
  );
}
