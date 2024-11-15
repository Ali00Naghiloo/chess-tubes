import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Typography,
} from '@mui/material';
import { Close } from '@mui/icons-material';
// components
import { DialogAnimate } from '@/components/animate';
import { RHFCheckbox, RHFSelect, RHFTextField } from '@/components/hook-form';
import FormProvider from '@/components/hook-form/FormProvider';
// hooks
import useResponsive from '@/hooks/useResponsive';
//
import { provinces } from '@/_mock/assets/provinces';

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  handleClose: VoidFunction;
};

export default function ReportBetterPriceDialog({ handleClose, open }: Props) {
  //

  const isMobile = useResponsive('down', 'sm');

  return (
    <DialogAnimate open={open} onClose={handleClose} dir="rtl" fullScreen={isMobile}>
      <DialogTitle>گزارش قیمت مناسب تر</DialogTitle>

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

      <ReportBetterPriceDialogForm handleClose={handleClose} />
    </DialogAnimate>
  );
}

// ----------------------------------------------------------------------

type ReportBetterPriceDialogFormProps = {
  handleClose: VoidFunction;
};

type FormValuesProps = {
  price: string;
  siteAddress: string;
  isItSite: boolean;
  shopName: string;
  shopLocation: string;
  afterSubmit?: string;
};

function ReportBetterPriceDialogForm({ handleClose }: ReportBetterPriceDialogFormProps) {
  //

  const reportBetterPriceSchema = Yup.object().shape({
    price: Yup.string().required('قیمت مورد نظر را به تومن وارد کنید'),
    siteAddress: Yup.string().required('آدرس سایت مورد نظر را وارد کنید'),
    isItSite: Yup.boolean().required(''),
    shopName: Yup.string().required('نام فروشگاه مورد نظر را وارد کنید'),
    shopLocation: Yup.string().required('مکان فروشگاه مورد نظر را وارد کنید'),
  });

  const defaultValues: FormValuesProps = {
    price: '',
    siteAddress: '',
    isItSite: false,
    shopName: '',
    shopLocation: '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(reportBetterPriceSchema),
    defaultValues,
  });

  const { reset, setError, handleSubmit, watch } = methods;

  const onSubmit = (data: FormValuesProps) => {
    try {
      // perform submit
    } catch (err) {
      reset();
      setError('afterSubmit', { ...err, message: err.message || err });
    }
  };

  const isItSite = watch('isItSite');

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
        <Typography sx={{ mb: 3 }}>کتاب ۲۰۲ مقدمه ای بر روان تحلیلگری در بازی شطرنج</Typography>

        <RHFTextField
          helperText="به تومان وارد کنید"
          sx={{ mb: 1 }}
          name="price"
          label="قیمت مورد نظر"
        />

        <RHFCheckbox sx={{ mb: 3 }} name="isItSite" label="در فروشگاه اینترنتی دیده ام" />

        {isItSite && <RHFTextField sx={{ mb: 3 }} name="siteAddress" label="آدرس سایت فروشگاهی" />}

        {!isItSite && (
          <>
            <RHFTextField sx={{ mb: 3 }} name="shopName" label="نام فروشگاه" />
            <RHFSelect sx={{ mb: 3 }} name="shopLocation" label="مکان فروشگاه">
              {provinces.map((p) => (
                <MenuItem dir="rtl" key={p.id} value={p.id}>
                  <Typography fontWeight={500}>{p.title}</Typography>
                </MenuItem>
              ))}
            </RHFSelect>
          </>
        )}
      </DialogContent>

      <DialogActions dir="ltr">
        <Button onClick={handleClose} disableElevation sx={{ ml: 3 }}>
          لغو و خروج
        </Button>

        <Button type="submit" variant="contained" disableElevation>
          ارسال قیمت جدید
        </Button>
      </DialogActions>
    </FormProvider>
  );
}
