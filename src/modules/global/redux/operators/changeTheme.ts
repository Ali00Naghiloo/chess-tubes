// redux
import { Dispatch } from '@reduxjs/toolkit';
// actions
import { changeThemeMode, hasError, successOperation } from '../actions';
// services
import { themeService } from '../../services';

// ----------------------------------------------------------------------

export default function changeTheme(newTheme: 'dark' | 'light') {
  return async (dispatch: Dispatch) => {
    try {
      themeService.changeTheme(newTheme);

      dispatch(changeThemeMode(newTheme));

      dispatch(successOperation());

      //
    } catch (err) {
      dispatch(hasError(err));
    }
  };
}
