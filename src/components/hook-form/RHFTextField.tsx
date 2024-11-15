// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { TextField, TextFieldProps } from '@mui/material';

// ----------------------------------------------------------------------

type Props = TextFieldProps & {
  name: string;
  disableError?: boolean;
  shrinkLabel?: boolean;
};

export default function RHFTextField({
  name,
  helperText,
  disableError,
  InputLabelProps = {},
  shrinkLabel = false,
  ...other
}: Props) {
  const { control } = useFormContext();
  //
  if (shrinkLabel) {
    InputLabelProps.shrink = true;
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          value={typeof field.value === 'number' && field.value === 0 ? '' : field.value}
          error={!!error && !disableError}
          helperText={error && !disableError ? error?.message : helperText}
          {...other}
          InputLabelProps={InputLabelProps}
        />
      )}
    />
  );
}
