import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import { Close } from '@mui/icons-material';
// components
import { RHFSelect, RHFTextField } from '@/components/hook-form';
import FormProvider from '@/components/hook-form/FormProvider';
// hooks
import useResponsive from '@/hooks/useResponsive';
// model
import { UserAddress } from '@/modules/user/models/user';
// _mocks
import { provinces } from '@/_mock/assets/provinces';
import { cities } from '@/_mock/assets/cities';
// redux
import addAddress from '@/modules/user/redux/operators/address/addAddress';
import { useDispatch } from '@/redux/store';
import editAddress from '@/modules/user/redux/operators/address/editAddress';
import { LoadingButton } from '@mui/lab';

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  handleClose: VoidFunction;
  type?: string;
  addressData?: UserAddress | null;
};

export default function SubmitNewAddressDialog({
  handleClose,
  open,
  addressData,
  type = 'add',
}: Props) {
  //

  const isMobile = useResponsive('down', 'sm');

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      dir="rtl"
      fullWidth
      maxWidth="xs"
      fullScreen={isMobile}
    >
      <DialogTitle>{type === 'add' ? 'ثبت آدرس جدید' : 'ویرایش آدرس'}</DialogTitle>

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

      <SubmitNewAddressDialogForm type={type} address={addressData} handleClose={handleClose} />
    </Dialog>
  );
}

// ----------------------------------------------------------------------

// const MAX_LENGTH_QUESTION = 100;

// ----------------------------------------------------------------------

type SubmitNewAddressDialogFormProps = {
  handleClose: VoidFunction;
  type: string;
  address?: UserAddress | null;
};

type FormValuesProps = {
  provinceId: string;
  cityId: string;
  afterSubmit?: string;
  address: string;
  buildingNumber: string;
  unit: string;
  postalCode: string;
  receiverName: string;
  phone: string;
};

function SubmitNewAddressDialogForm({
  handleClose,
  type,
  address,
}: SubmitNewAddressDialogFormProps) {
  //

  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const SubmitQuestionSchema = Yup.object().shape({
    provinceId: Yup.string().required('استان را انتخاب کنید'),
    cityId: Yup.string().required('شهر را انتخاب کنید'),
    address: Yup.string().required('آدرس پستی را وارد کنید'),
    buildingNumber: Yup.string().required('پلاک را وارد کنید'),
    unit: Yup.string().required('واحد را وارد کنید'),
    postalCode: Yup.string().required('کد پستی را وارد کنید'),
    receiverName: Yup.string().required('نام گیرنده را وارد کنید'),
    phone: Yup.string().required('شماره همراه گیرنده را وارد کنید'),
  });

  const defaultValues: FormValuesProps = {
    cityId: '',
    address: '',
    provinceId: '',
    buildingNumber: '',
    unit: '',
    postalCode: '',
    receiverName: '',
    phone: '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(SubmitQuestionSchema),
    defaultValues: type === 'add' ? defaultValues : (address as UserAddress),
  });

  const { reset, setError, handleSubmit, watch, setValue } = methods;

  const successOperation = () => {
    setIsLoading(false);
    toast.success(`آدرس با موفقیت ${type === 'edit' ? 'ویرایش' : 'اضافه'} شد`);
    handleClose();
  };

  const failureOperation = (msg: string) => {
    setIsLoading(false);
    toast.error(msg);
  };

  const onSubmit = (data: FormValuesProps) => {
    setIsLoading(true);
    try {
      if (type === 'edit') {
        dispatch(editAddress({ ...data, isActive: true }, successOperation, failureOperation));
      } else {
        dispatch(addAddress({ ...data, isActive: false }, successOperation, failureOperation));
      }
    } catch (err) {
      reset();
      setError('afterSubmit', { ...err, message: err.message || err });
    }
  };

  const provinceId = watch('provinceId');

  useEffect(() => {
    if (type === 'add' && provinceId !== '') {
      setValue('cityId', '');
    }

    if (type === 'edit' && address?.provinceId !== provinceId) {
      setValue('cityId', '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provinceId, setValue]);

  return (
    <FormProvider
      methods={methods}
      onSubmit={handleSubmit(onSubmit)}
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <DialogContent dividers sx={{ flexGrow: 1 }}>
        <Stack spacing={3}>
          <Stack direction="row" spacing={1}>
            <RHFTextField name="receiverName" label="نام  و نام خانوادگی گیرنده" size="small" />
            <RHFTextField name="phone" label="شماره همراه گیرنده" size="small" />
          </Stack>
          <Stack direction="row" spacing={1}>
            <RHFSelect size="small" label="استان" name="provinceId">
              {provinces.map((p) => (
                <MenuItem dir="rtl" key={p.id} value={p.id}>
                  <Typography fontWeight={500}>{p.title}</Typography>
                </MenuItem>
              ))}
            </RHFSelect>
            <RHFSelect size="small" label="شهر" name="cityId">
              {provinceId !== '' &&
                cities[provinceId].map((p: any) => (
                  <MenuItem disabled={provinceId === 'none'} dir="rtl" key={p.id} value={p.id}>
                    <Typography fontWeight={500}>{p.cityName}</Typography>
                  </MenuItem>
                ))}
            </RHFSelect>
          </Stack>

          <RHFTextField name="address" label="آدرس پستی" size="small" />

          <Stack direction="row" spacing={1}>
            <RHFTextField name="buildingNumber" label="پلاک" size="small" />
            <RHFTextField name="unit" label="واحد" size="small" />
            <RHFTextField name="postalCode" label="کد پستی" size="small" />
          </Stack>
        </Stack>
      </DialogContent>

      <DialogActions dir="ltr">
        <Button onClick={handleClose} disableElevation sx={{ ml: 3 }}>
          لغو و خروج
        </Button>

        <LoadingButton loading={isLoading} type="submit" variant="contained" disableElevation>
          {type === 'edit' ? 'ویرایش آدرس' : 'ثبت آدرس'}
        </LoadingButton>
      </DialogActions>
    </FormProvider>
  );
}
