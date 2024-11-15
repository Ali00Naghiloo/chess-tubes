import { useState } from 'react';
// @mui
import { Done } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Link, Popover, Stack, TextField, Typography } from '@mui/material';
//
import Iconify from '../iconify';

// ----------------------------------------------------------------------

const SOCIAL = [
  {
    id: 'facebook',
    icon: 'devicon:facebook',
    path: (link: string) => `https://www.facebook.com/sharer/sharer.php?u=${link}`,
  },
  {
    id: 'twitter',
    icon: 'devicon:twitter',
    path: (link: string) => `https://twitter.com/intent/tweet?url=${link}`,
  },
  {
    id: 'reddit',
    icon: 'logos:reddit-icon',
    path: (link: string) => `https://www.reddit.com/submit?url=${link}`,
  },
];

// ----------------------------------------------------------------------

type ShareBoxProps = {
  open: boolean;
  anchorEl: any;
  onClose: any;
  text?: string;
};

export default function ShareBox({
  anchorEl,
  onClose,
  open,
  text = 'اشتراک گذاری این محصول',
}: ShareBoxProps) {
  const [shareLink] = useState(window.location.href);

  const [clipboardState, setClipboardState] = useState({
    isLoading: false,
    isSuccess: false,
  });

  const { isLoading, isSuccess } = clipboardState;

  const copyLink = async () => {
    setClipboardState({ isLoading: true, isSuccess: false });
    await navigator.clipboard.writeText(shareLink);
    setClipboardState({ isLoading: false, isSuccess: true });
    setTimeout(() => {
      setClipboardState({ isLoading: false, isSuccess: false });
    }, 2000);
  };

  return (
    <Popover
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      PaperProps={{ sx: { minWidth: 280, pt: 1.5, px: 2 } }}
      sx={{ zIndex: 0 }}
      disableScrollLock
    >
      <Stack spacing={1}>
        <Stack spacing={0.5}>
          <Typography fontWeight={500} color="text.secondary">
            {text}
          </Typography>
          <TextField dir="ltr" value={shareLink} size="small" inputProps={{ readonly: true }} />
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <LoadingButton
            loading={isLoading}
            color={isSuccess ? 'success' : 'inherit'}
            startIcon={isSuccess && <Done />}
            variant="outlined"
            sx={{ minWidth: 60, opacity: isSuccess ? 1 : 0.5, mb: 1 }}
            onClick={copyLink}
          >
            کپی لینک
          </LoadingButton>
          <Stack direction="row" alignItems="center" spacing={1}>
            {SOCIAL.map((s) => (
              <Link key={s.id} href={s.path(shareLink)} target="_blank">
                <Iconify icon={s.icon} />
              </Link>
            ))}
          </Stack>
        </Stack>
      </Stack>
    </Popover>
  );
}
