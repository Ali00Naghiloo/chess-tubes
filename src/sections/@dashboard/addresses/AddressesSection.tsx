import { useEffect, useState } from 'react';
// @mui
import {
  Box,
  Button,
  Divider,
  IconButton,
  LinearProgress,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import { Add, Delete, Edit, MoreVert } from '@mui/icons-material';
// component
import { SubmitNewAddressDialog } from '@/components/address';
import Iconify from '@/components/iconify/Iconify';
// redux
import deleteAddress from '@/modules/user/redux/operators/address/deleteAddress';
import { useDispatch, useSelector } from '@/redux/store';
// utils
import { notNullAndEmpty } from '@/utils/typeChecl';
// toast
import { toast } from 'react-toastify';
// types
import { User, UserAddress } from '@/modules/user/models/user';
// utils
import { getCityName, getProvinceName } from '@/utils/addressUtils';
//
import getUserAddresses from '@/modules/user/redux/operators/address/getUserAddresses';
//
import { EmptyAddresses } from './EmptyAddresses';

// ----------------------------------------------------------------------

type DialogControlProps = {
  open: boolean;
  type: 'add' | 'edit';
  address: UserAddress | null;
};

export default function AddressesSection() {
  //
  const user = useSelector((s) => s.user.user) as User;

  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  const [dialogControl, setDialogControl] = useState<DialogControlProps>({
    open: false,
    type: 'add',
    address: null,
  });

  useEffect(() => {
    getAddresses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const successfulCallback = () => {
    setIsLoading(false);
  };

  const getAddresses = () => {
    dispatch(getUserAddresses(successfulCallback));
  };

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

  return (
    <Box sx={{ mb: 10 }}>
      {isLoading && (
        <Stack justifyContent="center" sx={{ height: 300 }}>
          <LinearProgress />
        </Stack>
      )}

      {!isLoading &&
        (user.addresses.length === 0 ? (
          <EmptyAddresses openDialog={handleDialogOpen} />
        ) : (
          <>
            {user.addresses.map((ad) => (
              <AddressItem key={ad.id} handleDialogOpen={handleDialogOpen} addressData={ad} />
            ))}

            <Button
              onClick={handleDialogOpen}
              variant="contained"
              disableElevation
              startIcon={<Add />}
            >
              ثبت‌ آدرس جدید
            </Button>
          </>
        ))}

      <SubmitNewAddressDialog
        type={dialogControl.type}
        addressData={dialogControl.address}
        open={dialogControl.open}
        handleClose={handleDialogClose}
      />
    </Box>
  );
}

// ----------------------------------------------------------------------

type AddressItemProps = {
  handleDialogOpen: any;
  addressData: UserAddress;
};

function AddressItem({ addressData, handleDialogOpen }: AddressItemProps) {
  //
  const { address, cityId, provinceId, receiverName, phone, id } = addressData;

  const { user } = useSelector((s) => s.user);

  const dispatch = useDispatch();

  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(menuAnchorEl);

  const handleOpenMenu = (e: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = () => setMenuAnchorEl(null);

  const deleteAddressOperation = () => {
    dispatch(deleteAddress(id as string, () => toast.success('آدرس با موفقیت حذف شد')));
    handleCloseMenu();
  };

  const editAddressOperation = () => {
    handleDialogOpen('', 'edit', addressData);
    handleCloseMenu();
  };

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="subtitle1">{address}</Typography>

        <IconButton onClick={handleOpenMenu}>
          <MoreVert />
        </IconButton>
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
            {notNullAndEmpty(receiverName) ? `${receiverName}` : user?.mobile}
          </Typography>
        </Stack>
      </Stack>
      <Divider sx={{ my: 2 }} />

      <Menu
        onClose={handleCloseMenu}
        open={open}
        anchorEl={menuAnchorEl}
        anchorOrigin={{ horizontal: 'left', vertical: 'center' }}
        PaperProps={{
          elevation: 0,
          variant: 'outlined',
        }}
        sx={{
          '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
              fontSize: 18,
              mr: 1,
            },
          },
        }}
      >
        <MenuItem disableRipple dir="rtl">
          <Edit />
          <Typography onClick={editAddressOperation} variant="subtitle2" fontWeight={500}>
            ویرایش آدرس
          </Typography>
        </MenuItem>

        <MenuItem disableRipple dir="rtl" onClick={deleteAddressOperation}>
          <Delete color="error" />
          <Typography color="error.main" variant="subtitle2" fontWeight={500}>
            حذف آدرس
          </Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
}
