import { ChangeEvent, useState } from 'react';
import * as Yup from 'yup';
import { UseFormSetValue, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
// next
import { useRouter } from 'next/router';
import { useParams } from 'next/navigation';
// @mui
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Chip,
  Container,
  DialogActions,
  DialogTitle,
  Divider,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  Stack,
  TextField,
  ToggleButton,
  Typography,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
// components
import { DialogAnimate } from '@/components/animate';
import { RHFCheckbox, RHFSlider, RHFTextField } from '@/components/hook-form';
import FormProvider from '@/components/hook-form/FormProvider';
import Iconify from '@/components/iconify/Iconify';
// utils
import uuidv4 from '@/utils/uuidv4';
// routes
import { PATH_PAGE } from '@/routes/paths';
// hooks
import { useDispatch, useSelector } from '@/redux/store';
import useResponsive from '@/hooks/useResponsive';
import { enNumToPer } from '@/utils/persianUtils';
//
import sendProductComment from '@/modules/comment/redux/operators/sendProductComment';
import sendCourseComment from '@/modules/comment/redux/operators/sendCourseComment';
import sendOnlineCourseComment from '@/modules/comment/redux/operators/sendOnlineCourseComment';

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  handleClose: VoidFunction;
  type?: 'course' | 'product';
  name?: string;
};

export default function SubmitCommentDialog({ handleClose, open, type = 'product', name }: Props) {
  //

  const isMobile = useResponsive('down', 'md');

  return (
    <DialogAnimate open={open} onClose={handleClose} dir="ltr" fullScreen>
      <DialogTitle dir="rtl">دیدگاه شما </DialogTitle>

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

      <Divider sx={{ mb: 3 }} />

      <Box dir="rtl">
        <Container dir="rtl" sx={{ ...(isMobile && { px: 0 }) }}>
          <Stack direction="row" spacing={2}>
            <SubmitCommentDialogForm type={type} handleClose={handleClose} name={name} />
            {!isMobile && <CommentHelperSection />}
          </Stack>
        </Container>
      </Box>
    </DialogAnimate>
  );
}
// ----------------------------------------------------------------------

function CommentHelperSection() {
  return (
    <Paper
      variant="outlined"
      sx={{
        width: '50%',
        height: 'fit-content',
        position: 'sticky',
        top: 20,
        right: 0,
        //
      }}
    >
      <Alert severity="info">
        <AlertTitle>دیگران را با نوشتن نظرات خود برای انتخاب این محصول راهنمایی کنید</AlertTitle>
        <Typography variant="subtitle2" sx={{ mb: 2, opacity: 0.9 }}>
          لطفا پیش از ارسال نظر خلاصه قوانین را مطالعه کنید
        </Typography>
        <Typography variant="body1" fontWeight={500} sx={{ opacity: 0.7 }}>
          لازم است محتوای ارسالی منطبق برعرف و شئونات جامعه و با بیانی رسمی و عاری از لحن ،تند
          تمسخرو توهین باشد از ارسال لینک سایتهای دیگر و ارایهی اطلاعات شخصی نظیر شماره تماس، ایمیل
          و آی دی شبکه های اجتماعی پرهیز کنید در نظر داشته باشید هدف نهایی از ارائه ی نظر درباره ی
          کالا ارائه ی اطلاعات مشخص و مفید برای راهنمایی سایر کاربران در فرآیند انتخاب و خرید یک
          محصول است با توجه به ساختار بخش نظرات، از پرسیدن سوال یا درخواست راهنمایی در این بخش
          خودداری کرده و سوالات خود را در بخش پرسش و پاسخ مطرح کنید افزودن عکس و ویدیو به نظرات با
          مطالعه ی این <Link href={PATH_PAGE.rules}>لینک</Link> میتوانید مفیدترین الگوی عکاسی از
          کالایی که خریداری کردهاید را مشاهده کنید پیشنهاد میشود قوانين كامل ثبت نظر را در این{' '}
          <Link href={PATH_PAGE.rules}>صفحه</Link> مطالعه کنید
        </Typography>
      </Alert>
    </Paper>
  );
}

// ----------------------------------------------------------------------

const MAX_LENGTH_Comment = 200;

const MARKS = [
  { value: 0, label: '' },
  { value: 1, label: '۱' },
  { value: 2, label: '۲' },
  { value: 3, label: '۳' },
  { value: 4, label: '۴' },
  { value: 5, label: '۵' },
];

const MARKS_MAP: any = {
  1: 'بسیار ضعیف',
  2: 'ضعیف',
  3: 'متوسط',
  4: 'خوب',
  5: 'عالی',
  0: 'لطفا یک عدد بین  ۱ تا ۵ را انتخاب کنید',
};

// ----------------------------------------------------------------------

type SubmitCommentDialogFormProps = {
  handleClose: VoidFunction;
  type: 'course' | 'product';
  name?: string;
};

type ProsOrConsItem = {
  value: string;
  id: string;
};

type FormValuesProps = {
  rating: string;
  title?: string;
  recommendState: string;
  commentText: string;
  isAnonymous: boolean;
  quality?: string;
};

function SubmitCommentDialogForm({ handleClose, type, name }: SubmitCommentDialogFormProps) {
  //

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const params = useParams();

  const router = useRouter();

  const isMobile = useResponsive('down', 'md');

  const { id: courseId } = useSelector((s) => s.onlineCourse.course);

  const user = useSelector((s) => s.user.user);

  const haveComment = useSelector((s) => s.comment.haveComment);

  const [selected, setSelected] = useState('');

  const SubmitCommentSchema = Yup.object().shape({
    rating: Yup.string().required('این فیلد اجباری است').notOneOf(['0'], 'این فیلد اجباری است'),
    recommendState: Yup.string().required('این فیلد اجباری است'),
    commentText: Yup.string().required('این فیلد اجباری است'),
    title: Yup.string().optional(),
    isAnonymous: Yup.boolean().required(''),
    quality: Yup.string().optional(),
  });

  const defaultValues: FormValuesProps = {
    recommendState: haveComment.recommendState ? haveComment.recommendState : '',
    rating: haveComment.rating ? haveComment.rating || '' : '',
    title: haveComment.title ? haveComment.title || '' : '',
    commentText: haveComment.commentText ? haveComment.commentText || '' : '',
    isAnonymous: haveComment.isAnonymous ? haveComment.isAnonymous : false,
    quality: haveComment.quality ? haveComment.quality : undefined,
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(SubmitCommentSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    formState: { errors },
  } = methods;

  const successCallback = (msg: string) => {
    handleClose();
    setIsLoading(false);
    toast.success(msg);
  };

  const failureCallback = (msg: string) => {
    setIsLoading(false);
    toast.error(msg);
  };

  const onSubmit = (data: FormValuesProps) => {
    try {
      if (router.isReady) {
        setIsLoading(true);
        const commentData = {
          ...data,
          isAnonymous: Number(data.isAnonymous),
        };
        dispatch(
          (type === 'course' ? sendOnlineCourseComment : sendProductComment)(
            type === 'course' ? courseId : (params.product_id as string),
            user?.id,
            commentData,
            successCallback,
            failureCallback
          )
        );
      }
    } catch (err) {
      reset();
    }
  };

  const toggleButtonHandleChange = (_: any, value: any) => {
    clearErrors('recommendState');

    if (selected === value) {
      setSelected('');
      setValue('recommendState', '');
    } else {
      setSelected(value);
      setValue('recommendState', value);
    }
  };

  const commentText = watch('commentText');

  const rating = watch('rating');

  const quality = watch('quality');

  return (
    <FormProvider
      methods={methods}
      onSubmit={handleSubmit(onSubmit)}
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        width: isMobile ? '100%' : '60%',
      }}
    >
      <Paper variant="outlined" sx={{ p: 2, px: 3 }}>
        {name != null && (
          <>
            <Typography variant="subtitle1">محصول : {name}</Typography>
            <Divider sx={{ my: 2 }} />
          </>
        )}

        <Box sx={{ px: { sm: 4, xs: 1 }, my: 4 }}>
          <Typography fontWeight={600} variant="subtitle2">
            امتیاز دهید* : {MARKS_MAP[rating]}
          </Typography>
          <RHFSlider
            color="primary"
            dir="ltr"
            name="rating"
            defaultValue={1}
            min={0}
            max={5}
            marks={MARKS}
            valueLabelFormat={(f) => MARKS_MAP[f]}
            valueLabelDisplay="auto"
          />
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography fontWeight={500} variant="subtitle2" sx={{ mb: 2 }}>
          خرید این محصول را به دیگران*
        </Typography>

        <Stack direction="row" justifyContent="space-around" sx={{ mb: 1 }}>
          <RecommendToggleButtons selected={selected} handleChange={toggleButtonHandleChange} />
        </Stack>
        {errors.recommendState?.message && (
          <Typography variant="caption" color="error.main">
            این فیلد اجباری است
          </Typography>
        )}

        <Divider sx={{ my: 4 }} />

        <Stack spacing={2}>
          <RHFTextField name="title" label="عنوان دیدگاه" fullWidth size="small" />

          <Box />

          <RHFTextField
            required
            name="commentText"
            label="متن دیدگاه"
            multiline
            rows={3}
            helperText={`${enNumToPer(commentText.length)}/${enNumToPer(MAX_LENGTH_Comment)}`}
            inputProps={{
              maxLength: MAX_LENGTH_Comment,
            }}
            fullWidth
            size="small"
          />
        </Stack>

        <RHFCheckbox sx={{ my: 1 }} name="isAnonymous" label="ارسال دیدگاه به صورت ناشناس" />

        <Divider sx={{ my: 3 }} />

        <Stack spacing={{ sm: 4, xs: 8 }}>
          <QualityResponseChips setValue={setValue} quality={quality} />
        </Stack>
        <Divider sx={{ my: 3 }} />
        <Typography variant="body2" fontWeight={500} sx={{ mb: 2 }}>
          ثبت دیدگاه به معنی پذیرش
          {'  '}
          <Link href={PATH_PAGE.rules}>قوانین و مقررات چس تیوبز</Link>
          {'  '}
          می باشد
        </Typography>

        <DialogActions dir="ltr">
          <Button onClick={handleClose} disableElevation sx={{ ml: 2 }}>
            لغو و خروج
          </Button>

          <LoadingButton loading={isLoading} type="submit" variant="contained" disableElevation>
            ثبت دیدگاه
          </LoadingButton>
        </DialogActions>
      </Paper>
    </FormProvider>
  );
}

// ----------------------------------------------------------------------

type QualityResponseChipsProps = {
  setValue: any;
  quality?: string | null;
};

function QualityResponseChips({ quality, setValue }: QualityResponseChipsProps) {
  const handleQualityResponseChipClick = (type: 'positive' | 'negative' | '') => {
    setValue('quality', type);
  };

  return (
    <Stack direction={{ sm: 'row', xs: 'column' }} spacing={1}>
      <Typography width={{ sm: '50%', xs: '100%' }} fontWeight={500}>
        نظر شما درباره کیفیت این محصول چیست؟
      </Typography>

      <Chip
        onClick={() => handleQualityResponseChipClick(quality === 'positive' ? '' : 'positive')}
        color={quality === 'positive' ? 'success' : 'default'}
        label="مثبت"
        icon={<Iconify icon="mdi:like-outline" />}
      />
      <Chip
        onClick={() => handleQualityResponseChipClick(quality === 'negative' ? '' : 'negative')}
        color={quality === 'negative' ? 'error' : 'default'}
        clickable
        label="منفی"
        icon={<Iconify icon="mdi:dislike-outline" />}
      />
      {/* <Chip
        color={quality === '' ? 'info' : 'default'}
        onClick={() => handleQualityResponseChipClick('')}
        clickable
        label="نظری ندارم"
      /> */}
    </Stack>
  );
}

// ----------------------------------------------------------------------

type ValueResponseChipsProps = {
  setValue: any;
  buyingWorth?: string;
};

function ValueResponseChips({ buyingWorth, setValue }: ValueResponseChipsProps) {
  const handleQualityResponseChipClick = (type: 'positive' | 'negative' | '') => {
    setValue('buyingWorth', type);
  };

  return (
    <Stack direction={{ sm: 'row', xs: 'column' }} spacing={1}>
      <Typography width={{ sm: '50%', xs: '100%' }} fontWeight={500}>
        نظر شما درباره ارزش خرید این محصول نسبت به قیمت آن چیست؟
      </Typography>

      <Chip
        onClick={() => handleQualityResponseChipClick(buyingWorth === 'positive' ? '' : 'positive')}
        color={buyingWorth === 'positive' ? 'success' : 'default'}
        label="مثبت"
        icon={<Iconify icon="mdi:like-outline" />}
      />
      <Chip
        onClick={() => handleQualityResponseChipClick(buyingWorth === 'negative' ? '' : 'negative')}
        color={buyingWorth === 'negative' ? 'error' : 'default'}
        clickable
        label="منفی"
        icon={<Iconify icon="mdi:dislike-outline" />}
      />
    </Stack>
  );
}

const TOGGLE_BUTTONS = [
  {
    value: 'recommended',
    text: 'پیشنهاد میکنم',
    icon: 'mdi:like-outline',
    color: 'success.light',
    activeColor: 'success',
  },
  {
    value: 'notSure',
    text: 'مطمئن نیستم',
    icon: 'fluent-emoji-high-contrast:exclamation-question-mark',
    color: 'grey.600',
    activeColor: 'info',
  },
  {
    value: 'notRecommend',
    text: 'پیشنهاد نمیکنم',
    icon: 'mdi:dislike-outline',
    color: 'error.light',
    activeColor: 'error',
  },
] as const;

type RecommendToggleButtonsProps = {
  selected: string;
  handleChange: any;
};

function RecommendToggleButtons({ selected, handleChange }: RecommendToggleButtonsProps) {
  return (
    <Stack direction="row" spacing={1}>
      {TOGGLE_BUTTONS.map((t) => (
        <ToggleButton
          key={t.value}
          color={t.activeColor}
          onChange={handleChange}
          selected={selected === t.value}
          value={t.value}
        >
          <Stack alignItems="center" spacing={1}>
            <Iconify icon={t.icon} color={t.color} />
            <Typography fontWeight={600} variant="subtitle2">
              {t.text}
            </Typography>
          </Stack>
        </ToggleButton>
      ))}
    </Stack>
  );
}
