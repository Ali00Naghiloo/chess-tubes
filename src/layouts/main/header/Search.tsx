/* eslint-disable @next/next/no-img-element */

// ----------------------------------------------------------------------

// @mui
import { Badge, Tooltip } from '@mui/material';
// components
import SvgColor from '@/components/svg-color';
import { IconButtonAnimate } from '../../../components/animate';

// ----------------------------------------------------------------------

type SearchProps = { onClick: VoidFunction };

export default function Search({ onClick }: SearchProps) {
  return (
    <Tooltip title="جست و جو...">
      <IconButtonAnimate
        onClick={onClick}
        //  href="/"
        sx={{ width: 40, height: 40, ml: 0.2 }}
      >
        <Badge color="primary" anchorOrigin={{ horizontal: 'left', vertical: 'top' }}>
          <SvgColor src="/assets/icons/navbar/ic_search.svg" />
        </Badge>
      </IconButtonAnimate>
    </Tooltip>
  );
}
