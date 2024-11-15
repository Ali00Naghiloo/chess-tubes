// redux
import { useDispatch, useSelector } from '@/redux/store';
// models
import { User } from '@/modules/user/models/user';
// modules
import changeActiveAddress from '@/modules/global/redux/operators/changeActiveAddress';

// ----------------------------------------------------------------------

export default function useActiveAddress() {
  //

  const dispatch = useDispatch();

  const { addresses } = useSelector((s) => s.user.user) as User;

  const { activeAddress } = useSelector((s) => s.global);

  if (addresses.length === 0) {
    return null;
  }

  if (activeAddress == null || activeAddress === '' || activeAddress === 0) {
    dispatch(changeActiveAddress(addresses[0].id ?? ''));
    return addresses[0];
  }

  const activeAddresses = addresses.filter((ad) => ad.id === activeAddress);

  if (activeAddresses.length === 0) {
    dispatch(changeActiveAddress(addresses[0].id ?? ''));
    return addresses[0];
  }

  return activeAddresses[0];
}
