// eslint
/* eslint-disable jsx-a11y/label-has-associated-control */

// ----------------------------------------------------------------------

// style
import styles from './styles.module.css';
// types
import { CheckboxProps } from './types';

// ----------------------------------------------------------------------

export default function Checkbox({ className, ...inputProps }: CheckboxProps) {
  return (
    <label className={styles.checkboxContainer}>
      <input {...inputProps} type="checkbox" className={`${styles.checkboxInput} ${className}`} />
      <span className={styles.checkmark} />
    </label>
  );
}
