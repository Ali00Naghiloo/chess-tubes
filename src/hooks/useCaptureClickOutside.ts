import { RefObject, useEffect } from 'react';

// ----------------------------------------------------------------------

export default function useCaptureClickOutside(
  elementRef: null | RefObject<HTMLElement>,
  handler: VoidFunction
) {
  useEffect(() => {
    //
    const clickHandler = (e: MouseEvent) => {
      const paperEl = elementRef?.current;

      if (paperEl != null && !paperEl.contains(e.target as HTMLElement)) {
        handler();
      }
    };

    setTimeout(() => document.addEventListener('click', clickHandler, { capture: true }), 200);

    return () => {
      document.removeEventListener('click', clickHandler, { capture: true });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
