// redux
import { Dispatch } from '@reduxjs/toolkit';
// actions
import { successfulGetRules } from '../actions';
// services
import { ruleService } from '../../service';

// ----------------------------------------------------------------------

export default function getRules(errorCallback?: any) {
  return async (dispatch: Dispatch) => {
    try {
      const response = await ruleService.getRules();

      dispatch(successfulGetRules(response.data.data));
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      errorCallback != null && errorCallback(err.message);
    }
  };
}
