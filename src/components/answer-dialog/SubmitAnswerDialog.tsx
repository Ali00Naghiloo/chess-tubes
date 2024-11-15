import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { toast } from 'react-toastify';
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
// routes
import { PATH_PAGE } from '@/routes/paths';
// redux
import { useDispatch } from '@/redux/store';
import makeAnswer from '@/modules/q&a/redux/operators/makeAnswer';
//

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  handleClose: VoidFunction;
  question?: string;
  questionId: string | number;
};

export default function SubmitAnswerDialog({ handleClose, open, question, questionId }: Props) {
  //

  const isMobile = useResponsive('down', 'sm');

  return (
    <DialogAnimate open={open} onClose={handleClose} dir="rtl" fullScreen={isMobile}>
      <DialogTitle>ثبت پاسخ برای پرسش مورد نظر</DialogTitle>

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

      <SubmitAnswerDialogForm
        handleClose={handleClose}
        question={question}
        questionId={questionId}
      />
    </DialogAnimate>
  );
}

// ----------------------------------------------------------------------

const MAX_LENGTH_QUESTION = 100;

// ----------------------------------------------------------------------

type SubmitAnswerDialogFormFormProps = {
  handleClose: VoidFunction;
  question?: string;
  questionId: string | number;
};

type FormValuesProps = {
  answer: string;
  afterSubmit?: string;
};

function SubmitAnswerDialogForm({
  handleClose,
  question,
  questionId,
}: SubmitAnswerDialogFormFormProps) {
  //

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const SubmitQuestionSchema = Yup.object().shape({
    answer: Yup.string().required('پاسخ خود را وارد کنید'),
  });

  const defaultValues: FormValuesProps = {
    answer: '',
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
      setIsLoading(true);
      dispatch(makeAnswer(questionId, data.answer, successCallback, failureCallback));
    } catch (err) {
      reset();
      setError('afterSubmit', { ...err, message: err.message || err });
    }
  };

  const answer = watch('answer');

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
        <Typography sx={{ mb: 3 }}>سوال : {question}</Typography>

        <RHFTextField
          sx={{ mb: 1.5 }}
          name="answer"
          label="پاسخ"
          multiline
          maxRows={3}
          helperText={`${enNumToPer(answer.length)}/${enNumToPer(MAX_LENGTH_QUESTION)}`}
          rows={3}
          inputProps={{
            maxLength: MAX_LENGTH_QUESTION,
          }}
        />

        <Typography variant="body2" fontWeight={500}>
          ثبت پاسخ به معنی پذیرش
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
          ارسال پاسخ
        </LoadingButton>
      </DialogActions>
    </FormProvider>
  );
}
