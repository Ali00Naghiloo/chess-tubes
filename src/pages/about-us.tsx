// next
import Image from 'next/image';
import Head from 'next/head';
// @mui
import { Typography, Container, Stack, Box, LinearProgress } from '@mui/material';
// layouts
import MainLayout from '@/layouts/main/MainLayout';
// hooks
import useResponsive from '@/hooks/useResponsive';
import { useDispatch, useSelector } from '@/redux/store';
import { Fragment, useEffect } from 'react';
import getAbouts from '@/modules/about/redux/operators/getAbouts';

// ----------------------------------------------------------------------

HomePage.getLayout = (page: React.ReactElement) => <MainLayout> {page} </MainLayout>;

const ACTIVITIES = [
  {
    title: 'دوره های آموزشی',
    context: 'به دو دسته زیر تقسیم می گردد :',
    subtitle1:
      'ترجمه ، زیرنویس و دوبله پکیج های معتبر آموزشی از بهترین اساتید شطرنج جهان در هر سه مرحله شروع ، وسط و آخر بازی و فروش آن ها در سایت و اپلیکیشن چس تیوبز با مبالغی بسیار کمتر از ارزش اصلی آن ها  (این قابلیت برای اولین بار در کشور انجام می گیرد.)',
    subtitle2:
      'ضبط دوره های آموزشی فارسی توسط اساتید و مربیان داخل کشور بصورت اختصاصی برای چس تیوبز و فروش آن ها با مبالغی بسار کمتر از ارزش اصلی آن ها',
  },
  {
    title: 'دوره های آنلاین',
    context: 'به دو دسته زیر تقسیم می گردد :',
    subtitle1: 'برگزاری دوره های آموزشی آنلاین اختصاصی توسط بهترین اساتید و مربیان داخل کشور',
    subtitle2: 'برگزاری دوره های آموزشی تفسیر زنده مسابقات توسط بهترین اساتید و مربیان داخل کشور',
  },
  {
    title: 'اخبار داخلی و بین المللی',
    context: 'پوشش کلیه اخبار آموزشی و مسابقات داخل و خارج از کشور بصورت روزانه و اختصاصی',
  },
  {
    title: 'فروش محصولات',
    context:
      'فروش انواع محصولات شطرنج اعم از نرم افزار ، ساعت ، صفحه و مهره ، انواع کتاب های ترجمه شده و موجود در بازار و هم چنین کتاب های ترجمه شده بصورت اختصاصی توسط تیم چس تیوبز که تنها از طریق سایت و اپلیکیشن چس تیوبز قابل خریداری می باشند و در هیچ سایت و اپلیکیشن دیگری قابل خریداری نمی باشند.',
  },
];

const HEAD_TEXT = `داستان شکل گیری چس تیوبز از فروردین ماه 1402 شکل گرفت جایی که فرصتی فراهم شد تا بالاخره بعد از گذشت بیش از یک دهه بتونم ایده سال های دور خود را در شطرنج پیاده سازی کنم. اون ایده چیزی نبود جز طراحی یک سایت و اپلیکیشن جامع شطرنج در کشور که کلیه شطرنجبازان از سراسر کشور حتی در دورافتاده ترین مناطق بتونن با اندک هزینه ای به بهترین آموزش های قهرمانان جهان و اساتید کشور دست پیدا کنند. چه بسا این سایت و اپلیکیشن نقطه شروعی برای طی کردن مسیر قهرمانی یک شطرنج باز در گوشه ای از کشور عزیزمان ایران باشد.`;

const GOAL_TEXT = `ما بعنوان یک وبسایت و اپلیکیشن که عمده فعالیتمان حول محور آموزش می چرخد سعی داریم با بکارگیری از دانش تخصصی اساتید و مربیان تراز اول داخل و خارج از کشور بهترین مسیر را برای رسیدن به درجه استادی پیش روی شطرنجبازان گرامی در سراسر کشور قرار دهیم. در کنار آموزش که رسالت اصلی تیم چس تیوبز می باشد ، با پوشش جامع اخبار داخلی و بین المللی و فروش محصولات ارزشمند شطرنج اعم از نرم افزارهای متنوع و کتاب های ترجمه شده که بصورت اختصاصی و با حمایت مالی تیم چس تیوبز توسط اساتید و مترجم های به نام کشور ترجمه می گردد و در اختیار عموم شطرنجبازان گرامی قرار می گیرد ، سعی داریم گامی موثر در جهت پیشرفت و اعتلای هر چه بیشتر شطرنج ایران عزیزمان برداریم.`;

// ----------------------------------------------------------------------

export default function HomePage() {
  //

  const isMobile = useResponsive('down', 'md');

  const dispatch = useDispatch();
  const data = useSelector((s) => s.about);

  useEffect(() => {
    dispatch(getAbouts());
  }, [dispatch]);

  if (!data.length)
    return (
      <Container>
        <Stack justifyContent="center" sx={{ height: 300 }}>
          <LinearProgress />
        </Stack>
      </Container>
    );

  return (
    <>
      <Head>
        <title>درباره ی ما | چس تیوبز</title>
        <meta name="description" content="صفحه اصلی چس تیوبز" />
      </Head>

      <Container dir="rtl" sx={{ my: 8 }}>
        <Stack direction="row">
          <Box>
            <Typography variant="h3" color="primary" fontWeight={800} sx={{ mb: 4 }}>
              درباره ما
            </Typography>
            {data?.map((i) => (
              <Fragment key={i.id}>
                <Stack direction="row" alignItems="center">
                  <Typography variant={isMobile ? 'h5' : 'h3'} fontWeight={800}>
                    {i.title}
                  </Typography>
                </Stack>

                <Typography paragraph sx={{ mb: 3, mt: 5 }} />
                <Box dangerouslySetInnerHTML={{ __html: i.content }} />
              </Fragment>
            ))}
          </Box>
          {!isMobile && (
            <Image alt="co_logos" src="/assets/icons/home/ic_logos.svg" height={450} width={400} />
          )}
        </Stack>
      </Container>
    </>
  );
}
