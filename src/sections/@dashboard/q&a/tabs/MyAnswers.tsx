import { toast } from 'react-toastify';
import { ChangeEvent, useEffect, useState } from 'react';
// next
import Link from 'next/link';
// @mui
import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Pagination,
  Stack,
  Typography,
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
// components
import Image from '@/components/image/Image';
import EmptyContent from '@/components/empty-content';
import PreLoader from '@/components/pre-loader';
import Iconify from '@/components/iconify';
// utils
import { enNumToPer } from '@/utils/persianUtils';
// paths
import { PATH_PAGE } from '@/routes/paths';
// redux
import { useDispatch, useSelector } from '@/redux/store';
// operators
import getUserAnswers from '@/modules/q&a/redux/operators/getUserAnswers';
// hooks
import useResponsive from '@/hooks/useResponsive';
// models
import { UserQuestionsItem, UserQuestionsItemAnswerItem } from '@/modules/q&a/models/qAndA';

// ----------------------------------------------------------------------

const findImage = (type: 'product' | 'course', image: string) => {
  if (type === 'product') {
    return PATH_PAGE.productImageUrl(image);
  }
  return PATH_PAGE.courseImageUrl(image);
};

const findHref = (type: 'product' | 'course', id: number) => {
  if (type === 'product') {
    return PATH_PAGE.product(id);
  }
  return PATH_PAGE.course(id);
};

const STATE_MAPPER = {
  'تائید شده': 'success',
  'در حال بررسی': 'info',
  'رد شده': 'error',
};

// ----------------------------------------------------------------------

export default function MyAnswers() {
  //

  const isMobile = useResponsive('down', 'sm');

  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  const {
    meta: { current_page, last_page },
    answers,
  } = useSelector((s) => s.qAndA.userAnswers);

  const successCallback = () => {
    setIsLoading(false);
  };

  const [page, setPage] = useState(current_page);

  const failureCallback = (msg: string) => {
    toast.error(msg);
    setIsLoading(false);
  };
  useEffect(() => {
    const searchParams = new URLSearchParams();
    searchParams.append('page', page.toString());
    setIsLoading(true);
    dispatch(getUserAnswers(searchParams.toString(), successCallback, failureCallback));
  }, [dispatch, page]);

  const handleChangePagination = (_: ChangeEvent<unknown>, pageNum: number) => {
    setPage(pageNum);
  };

  return (
    <>
      {isLoading && (
        <Container>
          <PreLoader />
        </Container>
      )}
      {!isLoading &&
        (answers.length === 0 ? (
          <Stack>
            <EmptyContent
              title="هیچ پرسشی یافت نشد!"
              description="همین حالا شروع به خرید دوره های آموزشی جذاب و محصولات کنید"
              action={
                <Button variant="contained" sx={{ mt: 2 }} disableElevation href={PATH_PAGE.root}>
                  برگشت به خانه
                </Button>
              }
            />
          </Stack>
        ) : (
          <>
            <Stack direction="column" divider={<Divider />} spacing={3}>
              {answers.map((d) => (
                <QuestionTabItem key={d.questionId} {...d} />
              ))}
            </Stack>

            {last_page !== 1 && (
              <Stack justifyContent="center" alignItems="center" sx={{ mt: 8 }}>
                <Pagination
                  count={Number(last_page)}
                  defaultPage={Number(current_page)}
                  page={Number(page)}
                  dir="rtl"
                  onChange={handleChangePagination}
                  size={isMobile ? 'small' : 'large'}
                  shape="rounded"
                  color="primary"
                />
              </Stack>
            )}
          </>
        ))}
    </>
  );
}

// ----------------------------------------------------------------------

type Props = UserQuestionsItem;

function QuestionTabItem({ answers, itemData, itemType, question, questionId, status }: Props) {
  //
  const [isAnswersOpen, setIsAnswersOpen] = useState(false);

  return (
    <Box sx={{ width: '100%' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
        <Stack direction="row" spacing={2} justifyContent="flex-start" alignItems="flex-start">
          <Stack spacing={2} alignItems="flex-start">
            <Link target="_blank" href={findHref(itemType, itemData[0].id)}>
              <Image
                src={findImage(itemType, itemData[0].mainImage)}
                alt={itemData[0].title}
                sx={{ height: 100, width: 100, borderRadius: 3 }}
              />
            </Link>
            <Button
              endIcon={isAnswersOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
              color="info"
              size="small"
              onClick={() => setIsAnswersOpen((e) => !e)}
            >
              {isAnswersOpen
                ? `بستن پاسخ ها (${enNumToPer(answers.length)})`
                : `  باز کردن پاسخ ها  (${enNumToPer(answers.length)})`}
            </Button>
          </Stack>
          <Stack direction="row" spacing={0.6} sx={{ pt: 2 }}>
            <Iconify color="info.main" icon="mdi:comment-question-outline" />
            <Typography variant="subtitle1">{question} </Typography>
          </Stack>
        </Stack>

        <Chip
          sx={{ position: { sm: 'static', xs: 'absolute' }, right: 10, top: 0 }}
          color={STATE_MAPPER[status] as 'default'}
          label={<Typography variant="body2">{status}</Typography>}
        />
      </Stack>

      {isAnswersOpen && (
        <Stack divider={<Divider variant="middle" sx={{ my: 1 }} />} sx={{ mt: 2 }}>
          {answers != null && answers.map((a) => <AnswerItem key={a.id} {...a} />)}
        </Stack>
      )}
    </Box>
  );
}

// ----------------------------------------------------------------------

type AnswerItemProps = UserQuestionsItemAnswerItem;

function AnswerItem({
  answerText,
  created_at,
  dislike,
  id,
  like,
  question_id,
  status,
  updated_at,
  user_id,
  user_name,
}: AnswerItemProps) {
  return (
    <Box>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Typography variant="body2" fontWeight={500} sx={{ opacity: 0.5 }}>
          پاسخ من :
        </Typography>
        <Typography fontWeight={500} sx={{ opacity: 0.7 }}>
          {answerText}
        </Typography>
      </Stack>
      <Typography variant="caption">{user_name}</Typography>
    </Box>
  );
}
