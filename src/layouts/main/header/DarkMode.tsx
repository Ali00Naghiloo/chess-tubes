// @mui
import { Badge, Tooltip } from '@mui/material';
// redux
import { useDispatch, useSelector } from '@/redux/store';
//
import changeTheme from '@/modules/global/redux/operators/changeTheme';
// components
import SvgColor from '@/components/svg-color';
import { IconButtonAnimate } from '../../../components/animate';

// ----------------------------------------------------------------------

const icon = (name: string): string => `/assets/icons/navbar/${name}.svg`;

export default function DarkMode() {
  const { theme: mode } = useSelector((s) => s.global);

  const dispatch = useDispatch();

  const handleChangeTheme = () => {
    dispatch(changeTheme(mode === 'dark' ? 'light' : 'dark'));
  };

  return (
    <Tooltip title={` تغییر تم به ${mode === 'dark' ? 'لالیت' : 'دارک'}`}>
      <IconButtonAnimate sx={{ width: 40, height: 40, ml: 1 }} onClick={handleChangeTheme}>
        <Badge color="primary" anchorOrigin={{ horizontal: 'left', vertical: 'top' }}>
          <SvgColor src={icon(mode === 'dark' ? 'ic_sun' : 'ic_moon')} />
        </Badge>
      </IconButtonAnimate>
    </Tooltip>
  );
}
