import { memo } from 'react';
// styles
import styles from './styles.module.css';
// types
import { SpinnerProps } from './types';

// ----------------------------------------------------------------------

function Spinner({ className }: SpinnerProps) {
  return (
    <svg
      className={`${styles.spinner} ${className}`}
      width="16px"
      height="16px"
      viewBox="0 0 66 66"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        className={styles.path}
        fill="none"
        strokeWidth="6"
        strokeLinecap="round"
        // stroke="white"
        cx="33"
        cy="33"
        r="30"
      />
    </svg>
  );
}

export default memo(Spinner);
