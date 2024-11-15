// @mui
import { Checkbox, ListItem, ListItemButton, Paper, Stack, Typography } from '@mui/material';
// components
import SvgColor from '@/components/svg-color/SvgColor';
// models
import { ShipmentOptions } from '@/modules/global/redux/states';
// redux
import { useDispatch, useSelector } from '@/redux/store';
// utils
import { fDate } from '@/utils/formatTime';
import { enNumToPerPrice } from '@/utils/persianUtils';
import useActiveShipmentType from '@/hooks/useActiveShipmentType';
import changeActiveShipmentType from '@/modules/global/redux/operators/changeActiveShipmentType';
import Image from '@/components/image';

// ----------------------------------------------------------------------

export default function CheckoutDeliveryType() {
  //

  const active = useActiveShipmentType();

  const { shipmentOptions } = useSelector((s) => s.global);

  const dispatch = useDispatch();

  const handleClickItem = (shipmentType: ShipmentOptions) => {
    if (String(shipmentType.id) !== String((active as any).id)) {
      dispatch(changeActiveShipmentType(shipmentType.id as string));
    }
  };

  return (
    <Paper variant="outlined" sx={{ py: 2, px: { sm: 2, md: 3, lg: 4, xs: 2 } }}>
      <Typography
        variant="h6"
        sx={{
          mb: 3,
          '&::before': { content: "'•'", color: 'primary.main', mr: 0.5 },
        }}
      >
        نوع ارسال
      </Typography>

      {shipmentOptions.map((op) =>
        op.isEnable ? (
          <ListItem key={op.id} disablePadding>
            <ListItemButton onClick={() => handleClickItem(op)} disableRipple>
              <DeliveryType {...op} isActive={active?.id === op.id} />
            </ListItemButton>
          </ListItem>
        ) : null
      )}
    </Paper>
  );
}

// ----------------------------------------------------------------------

function DeliveryType({
  cost,
  deliveryTime,
  title,
  isActive,
  logo,
}: ShipmentOptions & { isActive: boolean }) {
  return (
    <Stack direction="row" alignItems="flex-start" spacing={1}>
      <Stack spacing={1}>
        {logo ? (
          <Image src={logo} alt={title} style={{ width: 40 }} />
        ) : (
          <SvgColor
            sx={{ width: 40, bgcolor: 'primary.main' }}
            src="/assets/icons/home/ic_tipaks_logo.svg"
          />
        )}

        <Checkbox color="info" checked={isActive} />
      </Stack>
      <Stack spacing={1}>
        <Typography fontWeight={600}>{title}</Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography variant="body2">زمان تحویل :</Typography>

          <Typography variant="body2" fontWeight={500}>
            {fDate(new Date().getTime() / 1000)} الی{' '}
            {fDate(new Date().getTime() / 1000 + Number(deliveryTime) * 24 * 60 * 60)}
          </Typography>
        </Stack>

        <Stack direction="row" spacing={2} alignItems="center">
          <Typography variant="body2">هزینه ارسال :</Typography>

          <Stack direction="row">
            <Typography variant="subtitle1" fontWeight={500}>
              {enNumToPerPrice(cost)}
            </Typography>
            <SvgColor src="/assets/icons/products/ic_toman.svg" sx={{ width: 15, ml: 0.5 }} />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
