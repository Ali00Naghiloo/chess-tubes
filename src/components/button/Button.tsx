// eslint
/* eslint-disable react/button-has-type */

// ----------------------------------------------------------------------

// types
import { ButtonProps } from './types';
// components
import FilledButton from './filledButton/FilledButton';
import TextButton from './textButton/TextButton';

// ----------------------------------------------------------------------

export default function Button({ variant = 'filled', ...otherProps }: ButtonProps) {
  return (
    <>
      {variant === 'filled' && <FilledButton {...otherProps} />}
      {variant === 'text' && <TextButton {...otherProps} />}
    </>
  );
}
