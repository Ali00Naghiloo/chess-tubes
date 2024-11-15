'use client';

import { useEffect, useState } from 'react';
// @mui
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { dispatch, useSelector } from '@/redux/store';
import getFaqTransactions from '@/modules/faqs/redux/operators/getFaqTransactions';

// ----------------------------------------------------------------------

export default function FaqAccordion() {
  const [panel, setPanel] = useState('');
  const { faqs } = useSelector((s) => s.faqs);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(
      getFaqTransactions(() => {
        setIsLoading(false);
      })
    );
  }, [dispatch]);

  const handleChangePanel =
    (panelName: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setPanel(isExpanded ? panelName : '');
    };

  return (
    <Box position="relative" sx={{ mt: 9, width: '100%' }}>
      {!isLoading &&
        faqs !== null &&
        faqs?.map((ac, index) => (
          <Accordion
            variant="outlined"
            key={ac.title}
            expanded={panel === `panel${index}`}
            onChange={handleChangePanel(`panel${index}`)}
          >
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography fontWeight={600}>{ac.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography fontWeight={500}>{ac.content}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      {isLoading &&
        new Array(10).fill(null).map((_, i) => (
          <Box key={i} sx={{ mt: 2, height: '48px' }}>
            <Card sx={{ px: 2 }}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ height: '48px' }}
              >
                <Skeleton width={200} height={30} />
                <Stack direction="row" spacing={4} alignItems="center">
                  <Skeleton width={30} height={30} />
                </Stack>
              </Stack>
            </Card>
          </Box>
        ))}
    </Box>
  );
}

// ----------------------------------------------------------------------
