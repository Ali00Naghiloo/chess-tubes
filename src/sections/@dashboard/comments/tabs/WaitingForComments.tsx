import { toast } from 'react-toastify';
import { ChangeEvent, useEffect, useState } from 'react';
// @mui
import { Box, Button, Container, Grid, Pagination, Paper, Stack, Typography } from '@mui/material';
import { ForumRounded } from '@mui/icons-material';
// components
import Image from '@/components/image/Image';
import EmptyContent from '@/components/empty-content';
import PreLoader from '@/components/pre-loader';
// utils
import { shuffleArray } from '@/utils/arrayUtils';
// _mock
import { _appCourses, _appProduct } from '@/_mock/arrays';
// paths
import { PATH_PAGE } from '@/routes/paths';
// redux
import { useDispatch, useSelector } from '@/redux/store';
// operators
import getWaitingForComments from '@/modules/comment/redux/operators/getWaitingForComments';
// hooks
import useResponsive from '@/hooks/useResponsive';

// ----------------------------------------------------------------------

export default function WaitingForCommentTab() {
  //

  const isMobile = useResponsive('down', 'sm');

  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  const {
    items,
    meta: { current_page, last_page },
  } = useSelector((s) => s.comment.waitingForComments);

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
    dispatch(getWaitingForComments(searchParams.toString(), successCallback, failureCallback));
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
        (items.length === 0 ? (
          <Stack>
            <EmptyContent
              title="محصولی موجود نیست!"
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
            <Grid container spacing={2}>
              {shuffleArray([..._appProduct, ..._appCourses]).map((d) => (
                <Grid item key={d.id} xs={12} sm={6}>
                  <WaitingForCommentTabItem {...d} />
                </Grid>
              ))}
            </Grid>

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
    </>
  );
}

// ----------------------------------------------------------------------

type Props = {
  name: string;
  image: string;
};

function WaitingForCommentTabItem({ image, name }: Props) {
  return (
    <Paper variant="outlined" sx={{ p: 1 }}>
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
        <Box>
          <Image src={image} alt={name} sx={{ height: 100, width: 100, borderRadius: 3 }} />
        </Box>
        <Typography variant="subtitle1">{name}</Typography>
      </Stack>
      <Button
        href={PATH_PAGE.product('2', { isSubmitComment: 'show' })}
        startIcon={<ForumRounded />}
        fullWidth
        variant="outlined"
      >
        ثبت نظر و امتیاز
      </Button>
    </Paper>
  );
}
