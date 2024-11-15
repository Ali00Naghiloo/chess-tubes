// next
import Image from 'next/image';
// @mui
import { Box, Paper, Stack, Typography } from '@mui/material';
import useResponsive from '@/hooks/useResponsive';
import FaqAccordion from './FaqAccordion';

// ----------------------------------------------------------------------

export default function FaqTopSection() {
  //

  const isMobile = useResponsive('down', 'md');

  return (
    <>
      <Box position="relative">
        {!isMobile && (
          <Box sx={{ position: 'absolute', top: 0, left: -30, zIndex: -1 }}>
            <Image
              src="/assets/images/backgrounds/ic_rect.jpg"
              alt="rect"
              width={400}
              height={200}
            />
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
            سوالات متداول
          </Typography>
          {isMobile && (
            <Image src="/assets/icons/home/ic_rule.svg" height={50} width={50} alt="rule" />
          )}
        </Stack>
      </Box>
      <Paper variant="outlined" sx={{ p: { md: 4, xs: 2 }, mt: 3 }}>
        <Stack direction="row" spacing={2}>
          <FaqAccordion />

          {!isMobile && (
            <Box sx={{ position: 'relative', top: -150 }}>
              <Image
                src="/assets/icons/home/ic_conversation.svg"
                height={366}
                width={366}
                alt="rule"
              />
            </Box>
          )}
        </Stack>
      </Paper>
    </>
  );
}
