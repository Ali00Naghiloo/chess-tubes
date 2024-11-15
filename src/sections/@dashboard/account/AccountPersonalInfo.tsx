import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useState } from 'react';
// @mui
import { Grid, MenuItem, Paper, Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { RHFDatePicker, RHFSelect, RHFTextField } from '@/components/hook-form';
import FormProvider from '@/components/hook-form/FormProvider';
import Iconify from '@/components/iconify/Iconify';
// forms
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from '@/redux/store';
// types
import { User } from '@/modules/user/models/user';
import editPersonalInfo from '@/modules/user/redux/operators/editPersonalInfo';
// utils
import { enNumToPer } from '@/utils/persianUtils';

// ----------------------------------------------------------------------

const MAX_LENGTH_ABOUT_TEXT = 100;

const GENDERS = [
  { label: 'مرد', value: 0 },
  { label: 'زن', value: 1 },
  { label: 'نامشخص', value: 2 },
];

// ----------------------------------------------------------------------

type FormValuesProps = {
  name?: string;
  birthday?: Date;
  gender?: string | number;
  phone?: string;
  nikname?: string;
  about?: string;
  afterSubmit?: string;
};

export default function AccountPersonalInfo() {
  //

  const { fullname, birthday, gender, phone, nikname, about } = useSelector(
    (s) => s.user.user
  ) as User;

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const loginSignUpSchema = Yup.object().shape({
    name: Yup.string().optional(),
    birthday: Yup.date().optional(),
    gender: Yup.mixed().optional(),
    phone: Yup.string().optional(),
    nikname: Yup.string().optional(),
    about: Yup.string().optional(),
  });

  const defaultValues: FormValuesProps = {
    name: fullname ?? '',
    birthday: new Date(birthday),
    gender: gender ?? 2,
    phone: enNumToPer(phone),
    nikname: nikname == null ? '' : nikname,
    about,
  };

  const methods = useForm<FormValuesProps>({
    // @ts-ignore
    resolver: yupResolver(loginSignUpSchema),
    defaultValues,
  });

  const { reset, setError, handleSubmit, watch } = methods;

  const successCallback = () => {
    toast.success('با موفقیت ثبت شد');
    setIsLoading(false);
  };
  const failureCallback = () => {
    toast.error('یه مشکلی پیش اومده');
    setIsLoading(false);
  };

  const onSubmit = (data: FormValuesProps) => {
    try {
      //
      setIsLoading(true);

      const newObj = {
        ...data,
        birthday: data.birthday != null ? new Date(data.birthday).getTime() : null,
        gender: data.gender == null ? 2 : data.gender,
      };

      dispatch(editPersonalInfo(newObj, successCallback, failureCallback));
    } catch (err) {
      reset();
      setError('afterSubmit', { ...err, message: err.message || err });
    }
  };

  const aboutMe = watch('about');

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Paper variant="outlined" sx={{ py: 2, px: { sm: 2, md: 3, lg: 4, xs: 2 } }}>
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            '&::before': { content: "'•'", color: 'primary.main', mr: 0.5 },
          }}
        >
          اطلاعات شخصی
        </Typography>

        <Grid container columnSpacing={{ sm: 4, md: 8, lg: 10, xs: 3 }} rowSpacing={3}>
          <Grid item xs={12} sm={12 / 2}>
            <RHFTextField
              name="name"
              InputLabelProps={{ shrink: true }}
              fullWidth
              size="small"
              label={
                <Stack dir="ltr" direction="row" alignContent="center" justifyContent="center">
                  نام و نام خانوادگی
                  <Iconify icon="mdi:user" sx={{ mr: 0.4 }} />
                </Stack>
              }
            />
          </Grid>

          <Grid item xs={12} sm={12 / 2}>
            <RHFDatePicker
              name="birthday"
              slotProps={{
                textField: {
                  size: 'small',
                  fullWidth: true,
                  InputLabelProps: { shrink: true },
                  error: false,
                },
              }}
              label={
                <Stack dir="ltr" direction="row" alignContent="center" justifyContent="center">
                  تاریخ تولد
                  <Iconify icon="material-symbols:date-range" sx={{ mr: 0.4 }} />
                </Stack>
              }
            />
          </Grid>

          <Grid item xs={12} sm={12 / 2}>
            <RHFSelect
              name="gender"
              InputLabelProps={{ shrink: true }}
              fullWidth
              size="small"
              label={
                <Stack dir="ltr" direction="row" alignContent="center" justifyContent="center">
                  جنسیت
                  <Iconify icon="tabler:gender-bigender" sx={{ mr: 0.4 }} />
                </Stack>
              }
            >
              {GENDERS.map((g) => (
                <MenuItem dir="rtl" key={g.value} value={g.value}>
                  {g.label}
                </MenuItem>
              ))}
            </RHFSelect>
          </Grid>

          <Grid item xs={12} sm={12 / 2}>
            <RHFTextField
              name="phone"
              InputLabelProps={{ shrink: true }}
              fullWidth
              size="small"
              label={
                <Stack dir="ltr" direction="row" alignContent="center" justifyContent="center">
                  شماره تلفن ضرروی
                  <Iconify icon="ic:baseline-phone" sx={{ mr: 0.4 }} />
                </Stack>
              }
            />
          </Grid>
          <Grid item xs={12} sm={12 / 2}>
            <RHFTextField
              name="about"
              InputLabelProps={{ shrink: true }}
              multiline
              rows={2}
              fullWidth
              size="small"
              helperText={`${enNumToPer(aboutMe == null ? 0 : aboutMe.length)}/${enNumToPer(
                MAX_LENGTH_ABOUT_TEXT
              )}`}
              inputProps={{
                maxLength: MAX_LENGTH_ABOUT_TEXT,
              }}
              label={
                <Stack dir="ltr" direction="row" alignContent="center" justifyContent="center">
                  درباره ی من
                  <Iconify icon="bi:person-badge-fill" sx={{ mr: 0.4 }} />
                </Stack>
              }
            />
          </Grid>
        </Grid>
        <LoadingButton
          sx={{ mt: 3 }}
          loading={isLoading}
          type="submit"
          variant="contained"
          disableElevation
        >
          ثبت اطلاعات
        </LoadingButton>
      </Paper>
    </FormProvider>
  );
}
