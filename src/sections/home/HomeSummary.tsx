// @mui
import { Box, Paper, Stack, Typography, styled } from '@mui/material';
// icons
import { ChessAnalyzeIcon, ChessBookIcon, ChessCourseIcon } from '@/assets/icons';
import ChessStrategyIcon from '@/assets/icons/ChessStrategyIcon';
// hooks
import useResponsive from '@/hooks/useResponsive';
import { useSelector } from '@/redux/store';

// ----------------------------------------------------------------------

const iconStyle = {
  sx: { width: { sm: 60, xs: 50 } },
};

// ----------------------------------------------------------------------

const StyledUnderlay = styled('div')(({ theme }) => ({
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: -1,
  position: 'absolute',
  backgroundImage: 'url(/assets/images/backgrounds/ic_background.svg)',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'top -80px left -100px',
  opacity: 0.5,
}));

// ----------------------------------------------------------------------

export default function HomeSummary() {
  //
  const { statisticalInfo } = useSelector((s) => s.global);

  return (
    <Stack
      flexWrap="wrap"
      direction="row"
      justifyContent="center"
      alignItems="center"
      display="flex"
      spacing={1}
      sx={{ position: 'relative', mt: 0, py: { sm: 5, xs: 2 } }}
    >
      <StyledUnderlay />

      <HomeSummaryItem
        name="فروشگاه"
        num={`${statisticalInfo.shopInfo.totalCount} مورد تا کنون`}
        icon={<ChessBookIcon {...iconStyle} />}
      />

      <HomeSummaryItem
        name="تفسیر زنده مسابقات"
        num="به زودی !"
        icon={<ChessAnalyzeIcon {...iconStyle} />}
      />

      <HomeSummaryItem
        name="دوره های آموزشی"
        num={`${statisticalInfo.courseInfo.totalCount} مورد تا کنون`}
        icon={<ChessCourseIcon {...iconStyle} />}
      />

      <HomeSummaryItem
        name="آموزش آنلاین"
        num="به زودی!"
        icon={<ChessStrategyIcon {...iconStyle} />}
      />
    </Stack>
  );
}

// ----------------------------------------------------------------------

type HomeSummaryItemProps = {
  name: string;
  icon: React.ReactNode;
  num: string | number;
};

function HomeSummaryItem({ icon, name, num }: HomeSummaryItemProps) {
  //

  const isMobile = useResponsive('down', 'sm');

  return (
    <Box>
      <Paper
        sx={{
          width: { sm: 200, xs: 170 },
          p: { md: 2, xs: 0 },
          mb: 2,
          height: { md: 170, xs: 100 },
        }}
        variant="outlined"
      >
        <Stack
          dir="rtl"
          justifyContent={{ sm: 'space-around', xs: 'space-between' }}
          alignItems="center"
          direction={{ xs: 'row', md: 'column' }}
          sx={{ height: '100%' }}
        >
          <Box>{icon}</Box>
          <Stack
            justifyContent="center"
            alignItems="center"
            sx={{ pt: 0, pr: isMobile ? 1 : 0, pb: { xs: 2, md: 0 } }}
          >
            <Typography variant={isMobile ? 'caption' : 'subtitle1'} fontWeight={700}>
              {name}
            </Typography>
            <Typography fontWeight={500} variant="caption" dir="rtl" sx={{ pt: 1, opacity: 0.9 }}>
              {num}
            </Typography>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
}
