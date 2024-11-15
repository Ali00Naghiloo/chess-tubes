/* eslint-disable @next/next/no-img-element */

// ----------------------------------------------------------------------

// @mui
import { Badge, Tooltip } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '@/routes/paths';
// components
import SvgColor from '@/components/svg-color';
import { IconButtonAnimate } from '../../../components/animate';

// ----------------------------------------------------------------------

export default function Bookmark() {
  return (
    <Tooltip title="محصولات مورد علاقه">
      <IconButtonAnimate href={PATH_DASHBOARD.fav} sx={{ width: 40, height: 40, ml: 0.2 }}>
        <Badge color="primary" anchorOrigin={{ horizontal: 'left', vertical: 'top' }}>
          <SvgColor src="/assets/icons/navbar/ic_bookmark.svg" />
        </Badge>
      </IconButtonAnimate>
    </Tooltip>
  );
}
