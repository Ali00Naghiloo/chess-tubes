// @mui
import { LinearProgress, Stack } from '@mui/material';

// ----------------------------------------------------------------------

export default function PreLoader() {
  return (
    <Stack justifyContent="center" sx={{ height: 300 }}>
      <LinearProgress />
    </Stack>
  );
}
