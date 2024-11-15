import { ChangeEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
// @mui
import {
  Container,
  Divider,
  Grid,
  IconButton,
  InputBase,
  LinearProgress,
  Pagination,
  Paper,
  Stack,
} from '@mui/material';
// hooks
import useResponsive from '@/hooks/useResponsive';
// redux
import { dispatch, useSelector } from '@/redux/store';
// operators
import getListOfCourses from '@/modules/live-analysis/redux/operators/getListOfCourses';
// components
import SortSelect from '@/components/select-sort/SelectSort';
import LiveAnalysisCard from '@/components/live-analysis-card';
import Iconify from '@/components/iconify';

// ----------------------------------------------------------------------

const SORT_ITEMS = [
  { label: 'در حال ثبت نام', value: 'sort=entenrolling&dir=desc' },
  { label: 'اتمام ثبت نام', value: 'sort=timeoutEnrolling&dir=desc' },

  { label: 'تکمیل ظرفیت', value: 'sort=fullCapacity&dir=desc' },
  { label: 'در حال برگزاری', value: 'sort=running&dir=desc' },

  { label: 'برگزار شده', value: 'sort=finished&dir=desc' },
];

// ----------------------------------------------------------------------

export default function LiveAnalysisCourses() {
  const isMobile = useResponsive('down', 'sm');

  const { data, current_page, last_page } = useSelector((s) => s.liveAnalysis.courses);

  const [isLoading, setIsLoading] = useState(false);

  const [page, setPage] = useState(current_page);
  const [search, setSearch] = useState('');

  const [filter, setFilter] = useState<string>('');

  const successCallback = () => {
    setIsLoading(false);
  };

  const failureCallback = (msg: string) => {
    toast.error(msg);
    setIsLoading(false);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(filter);
    searchParams.append('page', page.toString());
    searchParams.append('q', search);
    setIsLoading(true);
    dispatch(getListOfCourses(`${searchParams.toString()}`, successCallback, failureCallback));
  }, [filter, page, search]);

  const handleChangePagination = (_: ChangeEvent<unknown>, pageNum: number) => {
    setPage(pageNum);
  };

  return (
    <Stack sx={{ my: 10 }}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        sx={{ mb: { xs: 5, sm: 0 } }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
          <SortSelect sortItems={SORT_ITEMS} filter={filter} setFilter={setFilter} />
        </Stack>

        <Divider sx={{ my: { xs: 2, sm: 0 } }} />

        <Paper
          variant="outlined"
          sx={{
            p: '2px 4px',
          }}
          elevation={0}
        >
          <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
            <Iconify icon="eva:search-fill" />
          </IconButton>
          <InputBase
            dir="rtl"
            sx={{ ml: 1, flex: 1 }}
            placeholder="جست و جو..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Paper>
      </Stack>

      {!isMobile && <Divider sx={{ my: 4 }} />}

      {isLoading && (
        <Container>
          <Stack justifyContent="center" sx={{ height: 300 }}>
            <LinearProgress />
          </Stack>
        </Container>
      )}

      {!isLoading && (
        <>
          <Grid container spacing={{ xs: 1, sm: 2 }} justifyContent="flex-start">
            {data.map((p) => (
              <Grid key={p.id} item xs={12 / 2} sm={12 / 3} md={12 / 3} lg={12 / 4}>
                <LiveAnalysisCard {...p} id={String(p.id)} sx={{ width: 'auto', mb: 2 }} />
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
              color="darkPrimary"
            />
          </Stack>
        </>
      )}
    </Stack>
  );
}
