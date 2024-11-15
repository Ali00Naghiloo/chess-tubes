import { useState } from 'react';
// @mui
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Stack,
  Typography,
} from '@mui/material';
import { ChevronLeft, Close } from '@mui/icons-material';
// components
import Iconify from '@/components/iconify/Iconify';
import { SubmitNewAddressDialog } from '@/components/address';
// hooks
import useResponsive from '@/hooks/useResponsive';
// model
import { User, UserAddress } from '@/modules/user/models/user';
// redux
import { useDispatch, useSelector } from '@/redux/store';
// modules
import changeActiveAddress from '@/modules/global/redux/operators/changeActiveAddress';
// utils
import { getCityName, getProvinceName } from '@/utils/addressUtils';
import { notNullAndEmpty } from '@/utils/typeChecl';
//

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  handleClose: VoidFunction;
};

type DialogControlProps = {
  open: boolean;
  type: 'add' | 'edit';
  address: UserAddress | null;
};

export default function ChangeAddressDialog({ handleClose, open }: Props) {
  //
  const { addresses } = useSelector((s) => s.user.user) as User;

  const isMobile = useResponsive('down', 'sm');

  const dispatch = useDispatch();

  const { activeAddress } = useSelector((s) => s.global);

  const [dialogControl, setDialogControl] = useState<DialogControlProps>({
    open: false,
    type: 'add',
    address: null,
  });

  const handleDialogClose = () => {
    setDialogControl((s) => ({ ...s, open: false }));
  };

  const handleDialogOpen = (_: any, type?: 'edit' | 'add', address?: UserAddress) => {
    if (type == null) {
      setDialogControl({ address: null, type: 'add', open: true });
    } else {
      setDialogControl({ open: true, type, address: address as UserAddress });
    }
  };

  const handleClickItem = (address: UserAddress) => {
    if (String(address.id) !== String(activeAddress)) {
      dispatch(changeActiveAddress(address.id as string));
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      dir="rtl"
      fullWidth
      maxWidth="sm"
      fullScreen={isMobile}
    >
      <DialogTitle>انتخاب آدرس</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <Close />
      </IconButton>
      <DialogContent dividers sx={{ px: 0, flexGrow: 1 }}>
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={handleDialogOpen} disableRipple sx={{ py: 3 }}>
              <Stack
                sx={{ width: '100%' }}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Stack spacing={1} direction="row" alignItems="center" sx={{ opacity: 0.7 }}>
                  <Iconify icon="material-symbols:add-location" sx={{ width: 30, height: 30 }} />
                  <Typography variant="h6">ثبت آدرس جدید</Typography>
                </Stack>
                <ChevronLeft />
              </Stack>
            </ListItemButton>
          </ListItem>
          {addresses.map((ad) => (
            <ListItem divider key={ad.id} disablePadding>
              <ListItemButton onClick={() => handleClickItem(ad)} disableRipple>
                <AddressItem handleDialog={handleDialogOpen} addressData={ad} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </DialogContent>

      <SubmitNewAddressDialog
        type={dialogControl.type}
        addressData={dialogControl.address}
        open={dialogControl.open}
        handleClose={handleDialogClose}
      />
    </Dialog>
  );
}

// ----------------------------------------------------------------------

type AddressItemProps = {
  addressData: UserAddress;
  handleDialog: any;
};

function AddressItem({ addressData, handleDialog }: AddressItemProps) {
  //

  const { activeAddress } = useSelector((s) => s.global);

  const { address, cityId, provinceId, receiverName, phone, id } = addressData;

  const { user } = useSelector((s) => s.user);

  return (
    <Stack direction="row" alignItems="flex-start" sx={{ width: '100%' }}>
      <Checkbox color="info" checked={`${activeAddress}` === `${id}`} />
      <Box sx={{ mt: 1 }}>
        <Stack direction="row" alignItems="center" sx={{ mb: 2 }}>
          <Typography variant="subtitle1">{address}</Typography>
        </Stack>

        <Stack spacing={2}>
          <Stack direction="row" spacing={1}>
            <Iconify icon="solar:city-outline" sx={{ opacity: 0.8 }} />
            <Typography variant="subtitle2">
              {getProvinceName(provinceId)} - {getCityName(provinceId, cityId)}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1}>
            <Iconify icon="ic:baseline-phone" sx={{ opacity: 0.8 }} />
            <Typography variant="subtitle2">
              {notNullAndEmpty(phone) ? phone : user?.mobile}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1}>
            <Iconify icon="material-symbols:person" sx={{ opacity: 0.8 }} />
            <Typography variant="subtitle2">
              {notNullAndEmpty(receiverName) ? `${receiverName} ` : user?.fullname}
            </Typography>
          </Stack>
        </Stack>

        <Button
          onClick={(e) => handleDialog(e, 'edit', addressData)}
          color="info"
          endIcon={<ChevronLeft />}
          size="small"
          sx={{ mt: 1 }}
        >
          ویرایش
        </Button>
      </Box>
    </Stack>
  );
}
