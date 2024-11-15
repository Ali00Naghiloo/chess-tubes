import { ChangeEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
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
// components
import PreLoader from '@/components/pre-loader/PreLoader';
import Image from '@/components/image/Image';
// models
import { UserCommentsItem } from '@/modules/comment/models/comment';
// redux
import { useDispatch, useSelector } from '@/redux/store';
// operators
import getUserComments from '@/modules/comment/redux/operators/getUserComments';
// paths
import { PATH_PAGE } from '@/routes/paths';
// utils
import useResponsive from '@/hooks/useResponsive';
import { fDate } from '@/utils/formatTime';
import EmptyContent from '@/components/empty-content';

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

export default function MyCommentsTab() {
  //

  const isMobile = useResponsive('down', 'sm');

  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  const {
    comments,
    meta: { current_page, last_page },
  } = useSelector((s) => s.comment.userComments);

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
    dispatch(getUserComments(searchParams.toString(), successCallback, failureCallback));
  }, [dispatch, page]);

  const handleChangePagination = (_: ChangeEvent<unknown>, pageNum: number) => {
    setPage(pageNum);
  };

  return (
    <Stack spacing={5}>
      {isLoading && (
        <Container>
          <PreLoader />
        </Container>
      )}
      {!isLoading &&
        (comments.length === 0 ? (
          <Stack>
            <EmptyContent
              title="نظری موجود نیست!"
              description="شما هیچ نظری ثبت نکردید! همین حالا شروع به خرید محصول کنید و از دسترسی هزاران محصول شطرنجی لذت ببرید"
              action={
                <Button variant="contained" sx={{ mt: 2 }} disableElevation href={PATH_PAGE.root}>
                  برگشت به خانه
                </Button>
              }
            />
          </Stack>
        ) : (
          <>
            <Stack spacing={3} divider={<Divider />}>
              {comments.map((d, i) => (
                <MyCommentsTabItem key={d.commentId} {...d} />
              ))}
            </Stack>
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
          </>
        ))}
    </Stack>
  );
}

// ----------------------------------------------------------------------

type Props = UserCommentsItem;

function MyCommentsTabItem({
  title,
  commentText,
  itemData,
  itemType,
  state,
  negativeIdea,
  positiveIdea,
  rating,
  recommendState,
  sendDate,
  commentId,
  userReaction,
}: Props) {
  return (
    <Box sx={{ p: 1, position: 'relative' }}>
      <Stack direction="row" justifyContent="space-between">
        <Stack
          direction={{ sm: 'row', xs: 'column' }}
          alignItems="flex-start"
          spacing={2}
          sx={{ mb: 1 }}
        >
          <Box>
            <Link target="_blank" href={findHref(itemType, itemData[0].id)}>
              <Image
                src={findImage(itemType, itemData[0].mainImage)}
                alt={itemData[0].title}
                sx={{ height: 100, width: 100, borderRadius: 3 }}
              />
            </Link>
          </Box>
          <Box>
            <Typography variant="subtitle1">{title}</Typography>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              {commentText}
            </Typography>
            {positiveIdea != null &&
              positiveIdea.map((p: string) => (
                <Typography key={p} variant="subtitle2" color="success.light">
                  {p}
                </Typography>
              ))}
            {negativeIdea != null &&
              negativeIdea.map((p: string) => (
                <Typography key={p} variant="subtitle2" color="error.light">
                  {p}
                </Typography>
              ))}
          </Box>
        </Stack>
        <Chip
          sx={{ position: { sm: 'static', xs: 'absolute' }, right: 10, top: 0 }}
          color={STATE_MAPPER[state] as 'default'}
          label={<Typography variant="body2">{state}</Typography>}
        />
      </Stack>
      <Stack justifyContent="flex-end" alignItems="flex-end">
        <Typography variant="caption">{fDate(sendDate)}</Typography>
      </Stack>
    </Box>
  );
}
