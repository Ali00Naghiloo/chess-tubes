import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/router';
// @mui
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Link,
  Typography,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
// components
import { DialogAnimate } from '@/components/animate';
import { RHFTextField } from '@/components/hook-form';
import FormProvider from '@/components/hook-form/FormProvider';
// hooks
import useResponsive from '@/hooks/useResponsive';
// utils
import { enNumToPer } from '@/utils/persianUtils';
// redux
import { useDispatch, useSelector } from '@/redux/store';
// routes
import { PATH_PAGE } from '@/routes/paths';
//
import makeProductQuestion from '@/modules/q&a/redux/operators/makeProductQuestion';
import makeCourseQuestion from '@/modules/q&a/redux/operators/makeCourseQuestion';

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  handleClose: VoidFunction;
  type?: 'course' | 'product';
  name?: string;
};

export default function SubmitQuestionDialog({ handleClose, open, name, type = 'product' }: Props) {
  //

  const isMobile = useResponsive('down', 'sm');

  return (
    <DialogAnimate open={open} onClose={handleClose} dir="rtl" fullScreen={isMobile}>
      <DialogTitle>سوالی برایتان پیش آمده؟</DialogTitle>

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

      <SubmitQuestionDialogForm name={name} handleClose={handleClose} type={type} />
    </DialogAnimate>
  );
}

// ----------------------------------------------------------------------

const MAX_LENGTH_QUESTION = 100;

// ----------------------------------------------------------------------

type SubmitQuestionDialogFormProps = {
  handleClose: VoidFunction;
  type: 'product' | 'course';
  name?: string;
};

type FormValuesProps = {
  question: string;
  afterSubmit?: string;
};

function SubmitQuestionDialogForm({ handleClose, type, name }: SubmitQuestionDialogFormProps) {
  //

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const { courseId } = useSelector((s) => s.course.course);

  const params = useParams();

  const router = useRouter();

  const SubmitQuestionSchema = Yup.object().shape({
    question: Yup.string().required('سوال خود را وارد کنید'),
  });

  const defaultValues: FormValuesProps = {
    question: '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(SubmitQuestionSchema),
    defaultValues,
  });

  const { reset, setError, handleSubmit, watch } = methods;

  const successCallback = (msg: string) => {
    setIsLoading(false);
    toast.success(msg);
    handleClose();
  };

  const failureCallback = (msg: string) => {
    setIsLoading(false);
    toast.error(msg);
  };

  const onSubmit = (data: FormValuesProps) => {
    try {
      if (router.isReady) {
        setIsLoading(true);
        dispatch(
          (type === 'course' ? makeCourseQuestion : makeProductQuestion)(
            type === 'course' ? courseId : (params.product_id as string),
            data.question,
            successCallback,
            failureCallback
          )
        );
      }
    } catch (err) {
      reset();
      setError('afterSubmit', { ...err, message: err.message || err });
    }
  };

  const question = watch('question');

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
        {name != null && <Typography sx={{ mb: 3 }}>محصول‌ :‌ {name}</Typography>}

        <RHFTextField
          sx={{ mb: 1.5 }}
          name="question"
          label="پرسش"
          multiline
          maxRows={3}
          helperText={`${enNumToPer(question.length)}/${enNumToPer(MAX_LENGTH_QUESTION)}`}
          rows={3}
          inputProps={{
            maxLength: MAX_LENGTH_QUESTION,
          }}
        />

        <Typography variant="body2" fontWeight={500}>
          ثبت سوال به معنی پذیرش
          {'  '}
          <Link href={PATH_PAGE.rules}>قوانین و مقررات چس تیوبز</Link>
          {'  '}
          می باشد
        </Typography>
      </DialogContent>

      <DialogActions dir="ltr">
        <Button onClick={handleClose} disableElevation sx={{ ml: 3 }}>
          لغو و خروج
        </Button>

        <LoadingButton loading={isLoading} type="submit" variant="contained" disableElevation>
          ارسال پرسش
        </LoadingButton>
      </DialogActions>
    </FormProvider>
  );
}
