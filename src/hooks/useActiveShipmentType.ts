// redux
import { useDispatch, useSelector } from '@/redux/store';
// modules
import changeActiveShipmentType from '@/modules/global/redux/operators/changeActiveShipmentType';

// ----------------------------------------------------------------------

export default function useActiveShipmentType() {
  //

  const dispatch = useDispatch();

  const { shipmentOptions, activeShipmentType } = useSelector((s) => s.global);

  if (shipmentOptions.length === 0) {
    return null;
  }

  if (activeShipmentType == null || activeShipmentType === '') {
    dispatch(changeActiveShipmentType(shipmentOptions[0].id ?? ''));
    return shipmentOptions[0];
  }

  const activeAddresses = shipmentOptions.filter((ad) => ad.id === activeShipmentType);

  if (activeAddresses.length === 0) {
    dispatch(changeActiveShipmentType(shipmentOptions[0].id ?? ''));
    return shipmentOptions[0];
  }

  return activeAddresses[0];
}
