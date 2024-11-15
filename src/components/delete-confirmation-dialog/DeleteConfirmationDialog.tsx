// @mui
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';

// ----------------------------------------------------------------------

type ConfirmationDialogProps = {
  open: boolean;
  handleClose: VoidFunction;
  isLoading: boolean;
  headText?: string;
  bodyText?: string;
  actionText?: string;
  action: VoidFunction;
};

export default function DeleteConfirmationDialog({
  handleClose,
  open,
  isLoading,
  action,
  actionText = 'حذف',
  bodyText = 'آیا از حذف اطمینان دارید؟',
  headText = 'تاییدیه حذف',
}: ConfirmationDialogProps) {
  //

  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={handleClose} dir="rtl">
      <DialogTitle>{headText}</DialogTitle>

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

      <DialogContent dividers sx={{ flexGrow: 1 }}>
        {bodyText}
      </DialogContent>

      <DialogActions dir="ltr">
        <Button color="inherit" onClick={handleClose} disableElevation sx={{ ml: 3, opacity: 0.6 }}>
          لغو و خروج
        </Button>

        <LoadingButton
          color="error"
          onClick={action}
          loading={isLoading}
          type="submit"
          variant="contained"
          disableElevation
        >
          {actionText}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
