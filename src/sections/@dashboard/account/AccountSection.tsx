import { Stack } from '@mui/material';
import AccountInfo from './AccountInfo';
import AccountPersonalInfo from './AccountPersonalInfo';
import AccountNotification from './AccountNotification';

// ----------------------------------------------------------------------

export default function AccountSection() {
  return (
    <Stack spacing={4}>
      <AccountInfo />
      <AccountPersonalInfo />
      <AccountNotification />
    </Stack>
  );
}
