import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
// next
import { useRouter } from 'next/router';
// @mui
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  LinearProgress,
  MenuItem,
  Paper,
  Rating,
  Select,
  SelectChangeEvent,
  Stack,
  StackProps,
  Typography,
  alpha,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useResponsive from '@/hooks/useResponsive';
// components
import { SubmitCommentDialog } from '@/components/comment-dialog';
import Iconify from '@/components/iconify/Iconify';
import Scrollbar from '@/components/scrollbar/Scrollbar';
import EmptyContent from '@/components/empty-content';
// utils
import { fDate } from '@/utils/formatTime';
import { enNumToPer } from '@/utils/persianUtils';
// redux
import { useDispatch, useSelector } from '@/redux/store';
// modules
import getCourseComments from '@/modules/comment/redux/operators/getCourseComments';
import loadMoreCourseComment from '@/modules/comment/redux/operators/loadMoreCourseComment';
import likeOrDislikeComment from '@/modules/comment/redux/operators/likeOrDislikeComment';
// models
import { Comment } from '@/modules/comment/models/comment';
import uuidv4 from '@/utils/uuidv4';

// ----------------------------------------------------------------------

const SORT_ITEMS = [
  { label: 'قدیمی ترین', value: 'oldest' },
  { label: 'جدید ترین', value: 'newer' },
  { label: 'مفیدترین', value: 'useful' },
];

// ----------------------------------------------------------------------

export default function TabsComments() {
  //

  const [isLoading, setIsLoading] = useState(true);

  const [isLoadingMoreComments, setIsLoadingMoreComments] = useState(false);

  const router = useRouter();

  const dispatch = useDispatch();

  const { comments, commentSummary, commentsLinks } = useSelector((s) => s.comment);

  const { courseId, title, isCurrentUserBuyer } = useSelector((s) => s.course.course);

  const user = useSelector((s) => s.user.user);

  const successCallback = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    if (router.isReady) {
      dispatch(getCourseComments(courseId, user?.id, successCallback));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, router.isReady]);

  const isMobile = useResponsive('down', 'sm');

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const successLoadCommentsCallback = () => {
    setIsLoadingMoreComments(false);
  };

  const loadMoreComments = () => {
    setIsLoadingMoreComments(true);
    dispatch(loadMoreCourseComment(commentsLinks.next as string, successLoadCommentsCallback));
  };

  return (
    <>
      {isLoading && (
        <Stack justifyContent="center" sx={{ height: 300, px: { sm: 4, xs: 2 } }}>
          <LinearProgress />
        </Stack>
      )}
      {!isLoading &&
        (comments.length === 0 ? (
          <Stack>
            <EmptyContent
              title="هیچ دیدگاهی یافت نشد"
              description={isCurrentUserBuyer ? 'اولین نفری باشید که دیدگاهتان مطرح میکنید' : ''}
              action={
                <Button
                  variant="contained"
                  sx={{ mt: 1, display: isCurrentUserBuyer ? 'flex' : 'none' }}
                  disableElevation
                  onClick={() => setIsDialogOpen(true)}
                >
                  ثبت دیدگاه
                </Button>
              }
            />
          </Stack>
        ) : (
          <Box sx={{ pb: 4, px: { sm: 4, xs: 2 } }}>
            <Stack direction="row">
              <Typography sx={{ mr: 1 }} fontWeight={600}>
                دیدگاه های کاربران
              </Typography>
              <Typography variant="body2" fontWeight={500} sx={{ opacity: 0.6 }}>
                {enNumToPer(commentSummary.commentCount)} نفر امتیاز داده اند
              </Typography>
            </Stack>

            <Stack
              direction={{ sm: 'row', xs: 'column' }}
              sx={{ my: 5 }}
              spacing={{ sm: 10, xs: 6 }}
            >
              <Stack spacing={3}>
                <Paper sx={{ p: 1, px: 2 }} variant="outlined">
                  <Stack direction="row" spacing={2}>
                    <Rating dir="ltr" readOnly value={Number(commentSummary.rate)} />
                    <Typography variant="body2" whiteSpace="nowrap">
                      <Typography component="span" fontWeight={600} sx={{ mr: 0.5 }}>
                        {enNumToPer(commentSummary.rate)}
                      </Typography>
                      از ۵
                    </Typography>
                  </Stack>
                </Paper>

                <Paper sx={{ p: 1, px: 2 }} variant="outlined">
                  <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                    <Typography variant="body2">کیفیت و کارایی</Typography>
                    <Typography variant="body2">
                      {enNumToPer(commentSummary.quality?.total)} دیدگاه
                    </Typography>
                  </Stack>
                  <Progress
                    value1={`${
                      (Number(commentSummary.quality?.positive) /
                        Number(commentSummary.quality?.total)) *
                      100
                    }`}
                    value2={`${
                      (Number(commentSummary.quality?.negative) /
                        Number(commentSummary.quality?.total)) *
                      100
                    }`}
                  />
                </Paper>

                <Paper sx={{ p: 1, px: 2 }} variant="outlined">
                  <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                    <Typography variant="body2">قیمت و ارزش خرید</Typography>
                    <Typography variant="body2">
                      {enNumToPer(commentSummary.buyingWorth?.total)} دیدگاه
                    </Typography>
                  </Stack>
                  <Progress
                    value1={`${
                      (Number(commentSummary.buyingWorth?.positive) /
                        Number(commentSummary.buyingWorth?.total)) *
                      100
                    }`}
                    value2={`${
                      (Number(commentSummary.buyingWorth?.negative) /
                        Number(commentSummary.buyingWorth?.total)) *
                      100
                    }`}
                  />
                </Paper>

                {!isMobile && (
                  <Button
                    onClick={() => setIsDialogOpen(true)}
                    variant="contained"
                    size="large"
                    disableElevation
                    sx={{ display: isCurrentUserBuyer ? 'flex' : 'none' }}
                  >
                    ثبت دیدگاه
                  </Button>
                )}
              </Stack>

              <Box flexGrow={1}>
                <Stack direction="row" sx={{ opacity: 0.7 }} spacing={2} alignItems="center">
                  <Iconify icon="cil:filter" sx={{ width: 16, height: 16 }} />

                  <Typography variant="body2" fontWeight={600}>
                    فیلتر نظرات
                  </Typography>

                  <SortSelect />
                </Stack>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ overflow: 'hidden', height: 500 }}>
                  <Scrollbar
                    sx={{
                      mt: 0,
                      pl: { sm: 2, xs: 0 },
                    }}
                  >
                    {comments.map((c, index) => (
                      <CommentItem key={c.id} isLastComment={index === 9} {...c} />
                    ))}
                    {commentsLinks.next != null && (
                      <Stack>
                        <LoadingButton onClick={loadMoreComments} loading={isLoadingMoreComments}>
                          بارگذاری نظرات بیشتر
                        </LoadingButton>
                      </Stack>
                    )}
                  </Scrollbar>
                </Box>
                {isMobile && (
                  <>
                    <Divider sx={{ my: 2 }} />
                    <Button
                      onClick={() => setIsDialogOpen(true)}
                      fullWidth
                      variant="contained"
                      size="large"
                      disableElevation
                      sx={{ mt: 2, display: isCurrentUserBuyer ? 'flex' : 'none' }}
                    >
                      ثبت دیدگاه
                    </Button>
                  </>
                )}
              </Box>
            </Stack>
          </Box>
        ))}
      <SubmitCommentDialog
        type="course"
        open={isDialogOpen}
        handleClose={handleDialogClose}
        name={title}
      />
    </>
  );
}

// ----------------------------------------------------------------------

type CommentProps = Comment & {
  isLastComment?: boolean;
};

function CommentItem({
  comment,
  id,
  negativeIdea,
  positiveIdea,
  productId,
  sendDate,
  userReaction,
  user,
  title,
  isLastComment = false,
}: CommentProps) {
  const [isLoading, setIsLoading] = useState(false);

  const [type, setType] = useState('');

  const userData = useSelector((s) => s.user.user);

  const dispatch = useDispatch();

  const successCallback = () => {
    setIsLoading(false);
  };

  const failureCallback = (msg: string) => {
    toast.error(msg ?? 'یه مشکلی پیش اومده');
    setIsLoading(false);
  };

  const likeOrDislike = (t: 'like' | 'dislike') => {
    setIsLoading(true);
    setType(t);
    dispatch(
      likeOrDislikeComment(
        productId,
        id,
        userData?.id,
        t,
        successCallback,
        failureCallback,
        'course'
      )
    );
  };

  //
  return (
    <Box
      sx={{ width: '100%', borderBottom: isLastComment ? 0 : 1, borderColor: 'grey.300', mb: 4 }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="subtitle1">
          {title}

          <Chip
            sx={{
              ml: 1,
              backgroundColor: (theme) => alpha(theme.palette.success.light, 0.2),
              color: 'success.main',
            }}
            size="small"
            component="span"
            color="success"
            // TODO fix this
            // label={isBuyer ? 'خریدار' : ''}
            label="خریدار"
          />
        </Typography>
        <Typography fontWeight={500} variant="body2" sx={{ opacity: 0.6 }}>
          {` ${user}     (${fDate(sendDate)})`}
        </Typography>
      </Stack>
      <Typography variant="body2" fontWeight={500} sx={{ opacity: 0.6, mt: 0.6 }}>
        {comment}
      </Typography>

      <Box sx={{ my: 2 }}>
        <Box>
          {positiveIdea != null &&
            positiveIdea.map((c) => (
              <Typography key={uuidv4()} variant="body2" color="success.light" fontWeight={600}>
                {c}
              </Typography>
            ))}
        </Box>
      </Box>
      <Box sx={{ my: 1 }}>
        {negativeIdea != null &&
          negativeIdea.map((c) => (
            <Typography key={uuidv4()} variant="body2" color="error.light" fontWeight={600}>
              {c}
            </Typography>
          ))}
      </Box>
      <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2}>
        <Stack direction="row" alignItems="center">
          <Typography>{userReaction.like}</Typography>
          <IconButton onClick={() => likeOrDislike('like')} disabled={isLoading && type === 'like'}>
            {isLoading && type === 'like' ? (
              <CircularProgress size="small" color="inherit" sx={{ opacity: 0.5, minWidth: 15 }} />
            ) : (
              <Iconify icon="eva:heart-fill" />
            )}
          </IconButton>
        </Stack>

        <Stack direction="row" alignItems="center">
          <Typography>{userReaction.dislike}</Typography>

          <IconButton
            onClick={() => likeOrDislike('dislike')}
            disabled={isLoading && type === 'dislike'}
          >
            {isLoading && type === 'dislike' ? (
              <CircularProgress size="small" color="inherit" sx={{ opacity: 0.5, minWidth: 15 }} />
            ) : (
              <Iconify icon="ri:dislike-line" />
            )}
          </IconButton>
        </Stack>
      </Stack>
    </Box>
  );
}

// ----------------------------------------------------------------------

type ProgressProps = StackProps & {
  value1: string;
  value2?: string;
};

function Progress({ value1, value2 = '0', sx, ...other }: ProgressProps) {
  return (
    <Stack
      direction="row"
      sx={{
        backgroundColor: 'grey.300',
        width: '100%',
        height: 4,
        borderRadius: 1,
        position: 'relative',
        ...sx,
      }}
      {...other}
    >
      <Box
        sx={{
          backgroundColor: 'success.light',
          width: `${value1}%`,
          height: '100%',
          borderRadius: 1,
          position: 'relative',
        }}
      />
      <Box
        sx={{
          backgroundColor: 'error.light',
          width: `${value2}%`,
          height: '100%',
          borderRadius: 1,
          position: 'relative',
        }}
      />
    </Stack>
  );
}

// ----------------------------------------------------------------------

function SortSelect() {
  const [sortValue, setSortValue] = useState('');

  const handleChange = (e: SelectChangeEvent) => {
    setSortValue(e.target.value);
  };

  return (
    <FormControl sx={{ width: 200 }} size="small">
      <InputLabel id="sort-select-label">مرتب سازی بر اساس</InputLabel>
      <Select
        labelId="sort-select-label"
        value={sortValue}
        label="مرتب سازی بر اساس"
        onChange={handleChange}
      >
        {SORT_ITEMS.map((item) => (
          <MenuItem dir="rtl" key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
