import { useState } from 'react';
// @mui
import { Add, ChevronLeft } from '@mui/icons-material';
import { Button, Paper, Stack, Typography } from '@mui/material';
// components
import Iconify from '@/components/iconify/Iconify';
import { SubmitNewAddressDialog } from '@/components/address';
// hooks
import useActiveAddress from '@/hooks/useActiveAddress';
// utils
import { getCityName } from '@/utils/addressUtils';
// illustration
import { EmptyAddressesIllustration } from '@/assets/illustrations';
//
import ChangeAddressDialog from './ChangeAddressDialog';

// ----------------------------------------------------------------------

export default function CheckoutAddress() {
  //

  const activeAddress = useActiveAddress();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [isAddAddressDialogOpen, setIsAddAddressDialogOpen] = useState(false);

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleCloseAddAddressDialog = () => {
    setIsAddAddressDialogOpen(false);
  };

  return (
    <Paper variant="outlined" sx={{ py: 2, px: { sm: 2, md: 3, lg: 4, xs: 2 } }}>
      <Typography
        variant="h6"
        sx={{
          mb: 3,
          '&::before': { content: "'•'", color: 'primary.main', mr: 0.5 },
        }}
      >
        آدرس محل دریافت
      </Typography>

      {activeAddress == null ? (
        <Stack spacing={0.2} justifyContent="center" alignItems="center">
          <EmptyAddressesIllustration sx={{ width: 150 }} />
          <Typography fontWeight={500}>شما هیچ آدرس ثبت شده ای ندارید!</Typography>
          <Button onClick={() => setIsAddAddressDialogOpen(true)} startIcon={<Add />}>
            ثبت آدرس جدید
          </Button>
        </Stack>
      ) : (
        <>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ opacity: 0.7 }}>
            <Iconify icon="carbon:location-filled" sx={{ width: 30, height: 30 }} />
            <Typography variant="h6">
              {getCityName(activeAddress?.provinceId as string, activeAddress?.cityId as string)} -
              {activeAddress?.address}
            </Typography>
          </Stack>
          <Stack justifyContent="flex-end" alignItems="flex-end">
            <Button onClick={() => setIsDialogOpen(true)} color="info" endIcon={<ChevronLeft />}>
              تغییر یا ویرایش آدرس
            </Button>
          </Stack>
        </>
      )}

      <ChangeAddressDialog open={isDialogOpen} handleClose={handleCloseDialog} />

      <SubmitNewAddressDialog
        open={isAddAddressDialogOpen}
        handleClose={handleCloseAddAddressDialog}
      />
    </Paper>
  );
}
