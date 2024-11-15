// eslint
/* eslint-disable react/button-has-type */

// ----------------------------------------------------------------------

// components
import Spinner from '../../spinner/index';
// styles
import styles from './styles.module.css';
import typoTokens from '../../../theme/typo.module.css';

// ----------------------------------------------------------------------

import { FilledButtonProps } from './types';

export default function FilledButton({
  type = 'button',
  children,
  className,
  isLoading = false,
  fullWidth = false,
  ...buttonProps
}: FilledButtonProps) {
  return (
    <button
      type={type}
      {...buttonProps}
      className={`${styles.button} ${fullWidth ? styles.fullWidth : ''} ${className}`}
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
