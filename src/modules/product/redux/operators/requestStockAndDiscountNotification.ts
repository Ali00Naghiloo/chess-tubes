// redux
import { Dispatch } from '@reduxjs/toolkit';
// services
import { productService } from '../../service';

// ----------------------------------------------------------------------

export default function requestStockAndDiscountNotification(
  productId: string | number,
  successfulCallback: any,
  errorCallback?: any
) {
  return async (dispatch: Dispatch) => {
    try {
      const response = await productService.requestStockAndDiscountNotification(productId);

      successfulCallback(response.data.message);
      //
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      errorCallback != null && errorCallback(err.message);
    }
  };
}
