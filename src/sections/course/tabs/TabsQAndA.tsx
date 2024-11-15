import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
// next
import { useRouter } from 'next/router';
// @mui
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from '@mui/material';
import { ChevronLeft } from '@mui/icons-material';
// hooks
import useResponsive from '@/hooks/useResponsive';
// components
import Iconify from '@/components/iconify/Iconify';
import { SubmitQuestionDialog } from '@/components/question-dialog';
import Scrollbar from '@/components/scrollbar/Scrollbar';
import EmptyContent from '@/components/empty-content';
import { SubmitAnswerDialog } from '@/components/answer-dialog';
// redux
import { useDispatch, useSelector } from '@/redux/store';
// utils
import { enNumToPer } from '@/utils/persianUtils';
// modules
import getCourseQAndA from '@/modules/q&a/redux/operators/getCourseQAndA';
import { Answer, Question } from '@/modules/q&a/models/qAndA';
import likeOrDislikeAnswer from '@/modules/q&a/redux/operators/likeOrDislikeAnswer';
// models
import { User } from '@/modules/user/models/user';
//

// ----------------------------------------------------------------------

const SORT_ITEMS = [
  { label: 'قدیمی ترین', value: 'oldest' },
  { label: 'جدید ترین', value: 'newer' },
  { label: 'مفیدترین', value: 'useful' },
];

// ----------------------------------------------------------------------

export default function TabsQAndA() {
  //
  const [isLoading, setIsLoading] = useState(true);

  const [perPage, setPerPage] = useState(10);

  const isMobile = useResponsive('down', 'sm');

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const router = useRouter();

  const dispatch = useDispatch();

  const { courseId, title, isCurrentUserBuyer } = useSelector((s) => s.course.course);

  const { qAndA } = useSelector((s) => s.qAndA);

  const { id } = useSelector((s) => s.user.user) as User;

  const successCallback = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    if (router.isReady) {
      dispatch(getCourseQAndA(courseId, id, successCallback));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, router.isReady]);

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      {isLoading && (
        <Stack sx={{ height: 300, px: { sm: 4, xs: 2 } }} justifyContent="center">
          <LinearProgress />
        </Stack>
      )}
      {!isLoading &&
        (qAndA.length === 0 ? (
          <Stack>
            <EmptyContent
              title="هیچ پرسش و پاسخی یافت نشد"
              description="اولین نفری باشید که پرسش مطرح میکنید"
              action={
                <Button
                  variant="contained"
                  sx={{ mt: 1 }}
                  disableElevation
                  onClick={() => setIsDialogOpen(true)}
                >
                  ثبت پرسش
                </Button>
              }
            />
          </Stack>
        ) : (
          <Box sx={{ pb: 4, px: { sm: 4, xs: 2 } }}>
            <Stack direction="row">
              <Typography sx={{ mr: 1 }} fontWeight={600}>
                پرسش و پاسخ
              </Typography>
              <Typography variant="body2" fontWeight={500} sx={{ opacity: 0.6 }}>
                {enNumToPer(qAndA.length)} پرسش و پاسخ
              </Typography>
            </Stack>

            <Stack
              direction={{ sm: 'row', xs: 'column' }}
              sx={{ my: 5 }}
              spacing={{ sm: 6, xs: 4 }}
            >
              {!isMobile && (
                <Stack spacing={3} flexGrow={1}>
                  <Typography variant="body2" color="text.secondary" fontWeight={500}>
                    شما هم درمورد این دوره آموزشی سوال ثبت کنید
                  </Typography>
                  <Button
                    onClick={() => setIsDialogOpen(true)}
                    variant="contained"
                    size="large"
                    disableElevation
                  >
                    ثبت پرسش
                  </Button>
                </Stack>
              )}
              <Box flexGrow={1}>
                <Stack direction="row" sx={{ opacity: 0.7 }} spacing={2} alignItems="center">
                  <Iconify icon="cil:filter" sx={{ width: 16, height: 16 }} />

                  <Typography variant="body2" fontWeight={600}>
                    فیلتر پرسش و پاسخ
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
                    <Stack divider={<Divider sx={{ my: 1 }} />} spacing={3}>
                      {qAndA.slice(0, perPage).map((c, index) => (
                        <QAndA key={c.id} {...c} isCurrentUserBuyer={isCurrentUserBuyer} />
                      ))}
                      {perPage + 10 <= qAndA.length && (
                        <Button onClick={() => setPerPage(perPage + 10)} color="info">
                          مشاهده سوال و پاسخ بیشتر
                        </Button>
                      )}
                    </Stack>
                  </Scrollbar>
                </Box>

                {isMobile && (
                  <>
                    <Divider sx={{ my: 2 }} />
                    <Stack spacing={1} flexGrow={1}>
                      <Typography variant="body2" color="text.secondary" fontWeight={500}>
                        شما هم درمورد این دوره آموزشی سوال ثبت کنید
                      </Typography>
                      <Button
                        onClick={() => setIsDialogOpen(true)}
                        fullWidth
                        variant="contained"
                        size="large"
                        disableElevation
                        sx={{ mt: 2 }}
                      >
                        ثبت پرسش
                      </Button>
                    </Stack>
                  </>
                )}
              </Box>
            </Stack>
          </Box>
        ))}
      <SubmitQuestionDialog
        name={title}
        type="course"
        open={isDialogOpen}
        handleClose={handleDialogClose}
      />
    </>
  );
}

// ----------------------------------------------------------------------

type QAndAProps = Question;

function QAndA({ answers, id, question, isCurrentUserBuyer }: QAndAProps) {
  //
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };
  return (
    <Box sx={{ width: '100%' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" spacing={0.6}>
          <Iconify color="info.main" icon="mdi:comment-question-outline" />
          <Typography variant="subtitle1">{question} </Typography>
        </Stack>
      </Stack>

      <Stack divider={<Divider variant="middle" sx={{ my: 1 }} />} sx={{ mt: 2 }}>
        {answers != null && answers.map((a) => <AnswerItem key={a.id} {...a} />)}
        <Stack alignItems="flex-start" sx={{ display: isCurrentUserBuyer ? 'flex' : 'none' }}>
          <Button onClick={() => setIsDialogOpen(true)} color="info" endIcon={<ChevronLeft />}>
            ثبت پاسخ
          </Button>
        </Stack>
      </Stack>

      <SubmitAnswerDialog
        handleClose={handleCloseDialog}
        open={isDialogOpen}
        questionId={id}
        question={question}
      />
    </Box>
  );
}

// ----------------------------------------------------------------------

type AnswerItemProps = Answer;

function AnswerItem({ answer, dislike, id, like, name }: AnswerItemProps) {
  const [isLoading, setIsLoading] = useState(false);

  const [type, setType] = useState('');

  const { courseId } = useSelector((s) => s.course.course);

  const router = useRouter();

  const { id: userId } = useSelector((s) => s.user.user) as User;

  const dispatch = useDispatch();

  const successCallback = () => {
    setIsLoading(false);
  };

  const failureCallback = (msg: string) => {
    toast.error(msg ?? 'یه مشکلی پیش اومده');
    setIsLoading(false);
  };

  const likeOrDislike = (t: 'like' | 'dislike') => {
    if (router.isReady) {
      setIsLoading(true);
      setType(t);
      dispatch(
        likeOrDislikeAnswer(courseId, userId, id, t, 'course', successCallback, failureCallback)
      );
    }
  };

  return (
    <Box>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Typography variant="body2" fontWeight={500} sx={{ opacity: 0.5 }}>
          پاسخ :
        </Typography>
        <Typography fontWeight={500} sx={{ opacity: 0.7 }}>
          {answer}
        </Typography>
      </Stack>
      <Typography variant="caption">{name}</Typography>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={2}>
        <Typography variant="body2" sx={{ opacity: 0.4 }}>
          آیا این پاسخ مفید بود؟
        </Typography>
        <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2}>
          <Stack direction="row" alignItems="center">
            <Typography>{like}</Typography>
            <IconButton
              onClick={() => likeOrDislike('like')}
              disabled={isLoading && type === 'like'}
            >
              {isLoading && type === 'like' ? (
                <CircularProgress
                  size="small"
                  color="inherit"
                  sx={{ opacity: 0.5, minWidth: 15 }}
                />
              ) : (
                <Iconify icon="eva:heart-fill" />
              )}
            </IconButton>
          </Stack>

          <Stack direction="row" alignItems="center">
            <Typography>{dislike}</Typography>
            <IconButton
              onClick={() => likeOrDislike('dislike')}
              disabled={isLoading && type === 'dislike'}
            >
              {isLoading && type === 'dislike' ? (
                <CircularProgress
                  size="small"
                  color="inherit"
                  sx={{ opacity: 0.5, minWidth: 15 }}
                />
              ) : (
                <Iconify icon="ri:dislike-line" />
              )}
            </IconButton>
          </Stack>
        </Stack>
      </Stack>
    </Box>
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
