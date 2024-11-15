// eslint
/* eslint-disable react/button-has-type */

// ----------------------------------------------------------------------

// components
import Spinner from '../../spinner/index';
// styles
import styles from './styles.module.css';
import typoTokens from '../../../theme/typo.module.css';

// ----------------------------------------------------------------------

import { TextButtonProps } from './types';

export default function TextButton({
  type = 'button',
  children,
  className,
  isLoading = false,
  fullWidth = false,
  ...buttonProps
}: TextButtonProps) {
  return (
    <button
      type={type}
      {...buttonProps}
      className={`${styles.button} ${fullWidth ? styles.fullWidth : ''}  ${className}`}
    >
      <span className={`${styles.label} ${typoTokens.bodyMedium}`}>
        {children}
        {isLoading && (
          <div className={styles.spinnerCon}>
            <Spinner className={styles.spinner} />
          </div>
        )}
      </span>
    </button>
  );
}
