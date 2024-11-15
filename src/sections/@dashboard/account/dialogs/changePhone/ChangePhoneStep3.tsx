// @mui
import { Button, DialogActions, DialogContent, Divider, Stack, Typography } from '@mui/material';
// components
import CompletedIllustrations from '@/assets/illustrations/CompletedIllustrations';

// ----------------------------------------------------------------------

type Props = {
  handleClose: VoidFunction;
};

export default function ChangePhoneStep3({ handleClose }: Props) {
  return (
    <>
      <DialogContent sx={{ flexGrow: 1 }}>
        <Stack alignItems="center" sx={{ my: 2 }}>
          <CompletedIllustrations sx={{ width: 100 }} />
          <Typography fontWeight={500} sx={{ my: 2 }}>
            شماره موبایل شما با موفقیت تغییر یافت!
          </Typography>
        </Stack>
      </DialogContent>

      <Divider />
      <DialogActions dir="ltr">
        <Button variant="contained" onClick={handleClose} disableElevation sx={{ ml: 3 }}>
          خروج
        </Button>
      </DialogActions>
    </>
  );
}
