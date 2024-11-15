import { useEffect, useState } from 'react';
// @mui
import { Stack } from '@mui/material';
// components
import PreLoader from '@/components/pre-loader';
// redux
import { useDispatch } from '@/redux/store';
// operators
import getTicketCategories from '@/modules/ticket/redux/operators/getTicketCategories';
//
import { NewTicketSide } from './NewTicketSide';
import { NewTicketInputs } from './NewTicketInputs';

// ----------------------------------------------------------------------

export default function NewTicketSection() {
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  const failureCallback = () => {
    setIsLoading(false);
  };

  const successCallback = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    dispatch(getTicketCategories(successCallback, failureCallback));
  }, [dispatch]);

  return (
    <>
      {isLoading && <PreLoader />}
      {!isLoading && (
        <Stack
          spacing={5}
          justifyContent="center"
          alignItems="flex-start"
          direction={{ lg: 'row', xs: 'column-reverse' }}
        >
          <NewTicketInputs />
          <NewTicketSide />
        </Stack>
      )}
    </>
  );
}
