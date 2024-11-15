// eslint
/* eslint-disable jsx-a11y/label-has-associated-control */

// ----------------------------------------------------------------------

// types
import { TextFieldProps } from './types';
// styles
import styles from './styles.module.css';
import typoTokens from '../../theme/typo.module.css';

// ----------------------------------------------------------------------

export default function TextField({
  inputDir = 'ltr',
  label,
  labelIcon,
  className,
  leftAdornment,
  rightAdornment,
  adornmentsDivider,
  error = false,
  helperText,
  containerClassName = '',
  fullWidth = false,
  errorMessage = helperText == null ? '' : helperText,
  ...inputProps
}: TextFieldProps) {
  return (
    <div className={`${styles.con} ${fullWidth ? styles.fullWidth : ''} ${containerClassName}`}>
      <span className={`${styles.inputCon} `}>
        <span className={styles.leftAdornment}>{leftAdornment}</span>

        <input
          type="text"
          {...inputProps}
          className={`${leftAdornment != null ? styles.leftAdornmentPadding : ''} ${
            rightAdornment != null ? styles.rightAdornmentPadding : ''
          } ${styles[inputDir]} ${typoTokens.bodyMedium}   ${styles.input} ${
            error ? styles.error : ''
          }  ${className}`}
        />
        <span className={styles.rightAdornment}>{rightAdornment}</span>
      </span>
      <label className={`${typoTokens.labelMedium} ${styles.label}`}>
        {labelIcon}
        {label}
      </label>
      <span
        className={`${typoTokens.labelSmall} ${styles.helperText} ${
          error ? styles.helperTextError : ''
        }`}
      >
        {error ? errorMessage : helperText}
      </span>
    </div>
  );
}
