import { ChangeEvent, useState } from 'react';
// next
import { useSearchParams } from 'next/navigation';
// @mui
import { Button, Divider, Pagination, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
// components
import PreLoader from '@/components/pre-loader';
import SearchCard from '@/components/search-card';
// hooks
import useResponsive from '@/hooks/useResponsive';
// redux
import { useSelector } from '@/redux/store';
import EmptyContent from '@/components/empty-content';

// ----------------------------------------------------------------------

const TYPE_MAPPER: Record<string, string> = {
  products: 'محصولات',
  news: 'اخبار',
  course: 'دوره های آموزشی',
};

// ----------------------------------------------------------------------

export default function SearchWrapper() {
  //
  const isMobile = useResponsive('down', 'sm');

  // const { data, current_page, last_page } = useSelector((s) => s.product.products);

  const { result } = useSelector((s) => s.global.searchResult);

  const query = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);

  const [page, setPage] = useState(1);

  // const [filter, setFilter] = useState<string>('');

  // const successCallback = () => {
  //   setIsLoading(false);
  // };

  // const failureCallback = (msg: string) => {
  //   // toast.error(msg);
  //   setIsLoading(false);
  // };

  // useEffect(() => {
  //   const searchParams = new URLSearchParams(filter);
  //   searchParams.append('page', page.toString());
  //   setIsLoading(true);
  //   // dispatch(getListOfProduct(searchParams.toString(), successCallback, failureCallback));
  // }, [filter, page]);

  const handleChangePagination = (_: ChangeEvent<unknown>, pageNum: number) => {
    setPage(pageNum);
  };

  return (
    <Stack sx={{ my: 10 }}>
      {/*  */}
      <Stack
        //
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        sx={{ mb: { xs: 5, sm: 0 } }}
      >
        <Typography variant="h6" fontWeight={800}>
          جست و جوی ({query.get('q') ?? ''}) در{' '}
          {query.get('type') == null ? 'کل سایت' : TYPE_MAPPER[query.get('type') as string]}
        </Typography>

        <Divider sx={{ my: { xs: 2, sm: 0 } }} />

        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
          {/* <SortSelect sortItems={SORT_ITEMS} filter={filter} setFilter={setFilter} /> */}
        </Stack>
      </Stack>

      {!isMobile && <Divider sx={{ my: 4 }} />}

      {/*  */}

      {isLoading && <PreLoader />}

      {!isLoading &&
        (result.length === 0 ? (
          <Stack>
            <EmptyContent
              title={`هیچ آیتمی با موضوع (${query.get('q') ?? ''}) یافت نشد`}
              description="از کلمات با معنا یا کلیدی استفاده کنید ، در صورت نیاز می توانید از طریق لینک زیر از طریق گوگل سایت را جست و جو کنید!"
              action={
                <Button
                  variant="contained"
                  sx={{ mt: 2 }}
                  disableElevation
                  href={`https://www.google.com/search?q=${
                    query.get('q') ?? ''
                  }&as_sitesearch=${'chesstubes.com'}`}
                >
                  جست و جو مستقیم گوگل
                </Button>
              }
            />
          </Stack>
        ) : (
          <>
            <Grid container spacing={3} justifyContent="flex-start">
              {result.map((p) => (
                <Grid key={p.id} xs={12 / 2} sm={12 / 3} md={12 / 4} lg={12 / 5}>
                  <SearchCard key={p.id} {...p} />
                </Grid>
              ))}
            </Grid>

            <Stack justifyContent="center" alignItems="center" sx={{ mt: 8 }}>
              <Pagination
                count={Number(1)}
                defaultPage={Number(1)}
                page={Number(page)}
                dir="rtl"
                onChange={handleChangePagination}
                size={isMobile ? 'small' : 'large'}
                shape="rounded"
                color="darkPrimary"
              />
            </Stack>
          </>
        ))}
    </Stack>
  );
}
