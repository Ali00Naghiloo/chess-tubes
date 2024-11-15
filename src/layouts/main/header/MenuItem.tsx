/* eslint-disable @next/next/no-img-element */

// ----------------------------------------------------------------------

// @mui
import { Badge, Tooltip } from '@mui/material';
// components
import SvgColor from '@/components/svg-color';
import { IconButtonAnimate } from '../../../components/animate';

// ----------------------------------------------------------------------

type Props = {
  onClick: VoidFunction;
};

export default function MenuItem({ onClick }: Props) {
  return (
    <Tooltip title="منو">
      <IconButtonAnimate onClick={onClick} sx={{ width: 40, height: 40, ml: 0.2 }}>
        <Badge color="primary" anchorOrigin={{ horizontal: 'left', vertical: 'top' }}>
          <SvgColor src="/assets/icons/navbar/ic_menu_item.svg" />
        </Badge>
      </IconButtonAnimate>
    </Tooltip>
  );
}
