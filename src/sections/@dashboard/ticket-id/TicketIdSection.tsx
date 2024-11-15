import { useEffect, useState } from 'react';
// next
import { useRouter } from 'next/router';
import { useParams } from 'next/navigation';
// components
import PreLoader from '@/components/pre-loader';
// redux
import { useDispatch } from '@/redux/store';
// operators
import getTicket from '@/modules/ticket/redux/operators/getTicket';
// hooks
import TicketChat from './TicketChat';

// ----------------------------------------------------------------------

export default function TicketIdSection() {
  //

  const [isLoading, setIsLoading] = useState(true);

  const { isReady } = useRouter();

  const query = useParams();

  const dispatch = useDispatch();

  const failureCallback = () => {
    setIsLoading(false);
  };

  const successCallback = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    if (isReady) {
      dispatch(getTicket(query.ticket_id as string, successCallback, failureCallback));
    }
    setIsLoading(true);
  }, [dispatch, isReady, query.ticket_id]);

  return (
    <>
      {isLoading && <PreLoader />}
      {!isLoading && <TicketChat />}
    </>
  );
}
