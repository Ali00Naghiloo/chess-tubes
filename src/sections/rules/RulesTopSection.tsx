// next
import Image from 'next/image';
// @mui
import { Box, Paper, Stack, Typography } from '@mui/material';
import useResponsive from '@/hooks/useResponsive';
import RulesBgRect from '@/assets/illustrations/RulesBgRect';
import RulesIllustration from '@/assets/illustrations/RulesIllustration';

// ----------------------------------------------------------------------

const HEAD_TEXT = `
قوانین پیش رو قرارداد قانونی است بین اپلیکیشن و سایت چس تیوبز (chesstubes.com) - و شما (کاربر استفاده کننده از خدمات سایت چس تیوبز) که از این به بعد به اختصار «چس تیوبز» و «کاربر/کاربران» نامیده می شود. چس تیوبز این حق را بر خود محفوظ می دارد هر زمان که لازم بداند همه یا بخشی از قوانین سایت را بدون اطلاع کاربران حذف، تغییر یا بروزرسانی کند و وظیفه کاربران است که با مراجعه به بخش «قوانین سایت» از آخرین وضعیت قوانین مطلع شوند.
`;

// const BOTTOM_TEXT = `
// شرکت رایان صنعت مینودر به شناسه ملی ۱۰۵۷۰۰۱۶۴۹۰ در سایت سازمان ثبت اسناد و املاک کشور به ثبت رسیده است. همچنین اپلیکیشن چس تیوبز در ساماندهی وزارت ارشاد مرکز توسعه فناوری اطلاعات و رسانه های دیجیتال با شناسه به ثبت رسیده است. بنابراین سایت و اپلیکیشن چس تیوبز دارای مجوزهای لازم جهت فعالیت می باشند
// `;

// ----------------------------------------------------------------------

export default function RulesTopSection() {
  //

  const isMobile = useResponsive('down', 'md');

  return (
    <>
      <Box position="relative">
        {!isMobile && (
          <Box sx={{ position: 'absolute', top: 0, left: -30, zIndex: -1 }}>
            <RulesBgRect width={400} height={200} />
          </Box>
        )}
        <Stack direction="row" alignItems="flex-end" spacing={1}>
          <Typography
            variant="h3"
            color={isMobile ? 'primary.main' : 'common.white'}
            fontWeight={800}
            sx={{
              pl: { md: 4, xs: 0 },
              pt: { md: 4, xs: 0 },
            }}
          >
            قوانین چس تیوبز
          </Typography>
          {isMobile && (
            <Image src="/assets/icons/home/ic_rule.svg" height={50} width={50} alt="rule" />
          )}
        </Stack>
      </Box>
      <Paper variant="outlined" sx={{ p: { md: 4, xs: 2 }, mt: 3 }}>
        <Stack direction="row" spacing={2}>
          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>
              قوانین پیش رو قرارداد قانونی است بین اپلیکیشن و سایت چس تیوبز{' '}
              <Typography color="primary.main" variant="h6" component="span">
                (chesstubes.com)
              </Typography>
            </Typography>

            <Typography paragraph fontWeight={500}>
              {HEAD_TEXT}
            </Typography>

            {/* <Typography variant="h6" sx={{ mb: 1, mt: 4 }}>
              بررسی کلی:
            </Typography>

            <Typography paragraph fontWeight={500}>
              {BOTTOM_TEXT}
            </Typography> */}
          </Box>
          {!isMobile && (
            <Box sx={{ position: 'relative', top: -150 }}>
              <RulesIllustration height={300} width={300} />
            </Box>
          )}
        </Stack>
      </Paper>
    </>
  );
}
