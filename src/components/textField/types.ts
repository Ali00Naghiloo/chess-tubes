export interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  labelIcon?: React.ReactElement;
  label?: string;
  inputDir?: 'rtl' | 'ltr';
  leftAdornment?: React.ReactElement;
  rightAdornment?: React.ReactElement;
  adornmentsDivider?: boolean;
  error?: boolean;
  errorMessage?: string;
  helperText?: string;
  fullWidth?: boolean;
  containerClassName?: string;
  ref?: any;
}
