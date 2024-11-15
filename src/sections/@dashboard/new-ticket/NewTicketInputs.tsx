import { useState } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
// next
import { useRouter } from 'next/router';
// components
import FormProvider from '@/components/hook-form/FormProvider';
import { RHFSelect, RHFTextField } from '@/components/hook-form';
// redux
import { useDispatch, useSelector } from '@/redux/store';
// @mui
import { MenuItem, Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// operators
import sendNewTicket from '@/modules/ticket/redux/operators/sendNewTicket';
// pats
import { PATH_DASHBOARD } from '@/routes/paths';

// ----------------------------------------------------------------------

type FormValuesProps = {
  category: string;
  subject: string;
  ticketContent: string;
};

export function NewTicketInputs() {
  //
  const { categories } = useSelector((s) => s.ticket);

  const [isLoading, setIsLoading] = useState(false);

  const { push } = useRouter();

  const dispatch = useDispatch();

  const NewTicketSchema = Yup.object().shape({
    category: Yup.string().required('دسته بندی مورد نظر را انتخاب کنید'),
    subject: Yup.string().required('موضوع تیکت را مشخص کنید'),
    ticketContent: Yup.string().required('توضیحات تیکت را ارائه دهید'),
  });

  const defaultValues: FormValuesProps = {
    category: '',
    subject: '',
    ticketContent: '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewTicketSchema),
    defaultValues,
  });

  const { reset, handleSubmit } = methods;

  const successCallback = (ticketId: string) => {
    setIsLoading(false);
    toast.success('تیکت با موفقیت ارسال گردید');
    setTimeout(() => {
      push(PATH_DASHBOARD.ticket(ticketId));
    }, 1500);
  };

  const failureCallback = (msg: string) => {
    setIsLoading(false);
    toast.error(msg);
  };

  const onSubmit = (data: FormValuesProps) => {
    setIsLoading(true);
    try {
      dispatch(sendNewTicket(data, successCallback, failureCallback));
    } catch (err) {
      reset();
      toast.error(err.message || err);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        {/*  */}
        <RHFSelect size="small" label="دسته بندی" name="category">
          {categories.map((c) => (
            <MenuItem dir="rtl" key={c.id} value={c.id}>
              <Typography fontWeight={500}>{c.name}</Typography>
            </MenuItem>
          ))}
        </RHFSelect>

        <RHFTextField name="subject" label="موضوع پیام" size="small" />

        <RHFTextField
          name="ticketContent"
          label="توضیحات"
          size="small"
          multiline
          rows={10}
          maxRows={10}
        />

        <Stack direction="row" justifyContent="flex-start" alignContent="flex-start">
          <LoadingButton loading={isLoading} type="submit" variant="contained" disableElevation>
            ارسال تیکت
          </LoadingButton>
        </Stack>
      </Stack>
    </FormProvider>
  );
}
