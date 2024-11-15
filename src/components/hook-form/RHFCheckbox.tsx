// form
import { Controller, useFormContext } from 'react-hook-form';
// mui
import { Checkbox, FormControlLabel, FormControlLabelProps, FormHelperText } from '@mui/material';

// ----------------------------------------------------------------------

interface RHFCheckboxProps extends Omit<FormControlLabelProps, 'control'> {
  name: string;
  helperText?: React.ReactNode;
  disableError?: boolean;
}

export default function RHFCheckbox({
  name,
  helperText,
  disableError,
  ...other
}: RHFCheckboxProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>
          <FormControlLabel control={<Checkbox {...field} checked={field.value} />} {...other} />

          {!disableError && (!!error || helperText) && (
            <FormHelperText error={!!error}>{error ? error?.message : helperText}</FormHelperText>
          )}
        </div>
      )}
    />
  );
}

// export default forwardRef<HTMLInputElement, Props>(({ name, ...other }, ref) => {
//   const { control } = useFormContext();

//   return (
//     <Controller
//       name={name}
//       control={control}
//       render={({ field, fieldState: { error } }) => (
//         <Checkbox
//           {...field}
//           value={typeof field.value === 'number' && field.value === 0 ? '' : field.value}
//           {...other}
//           ref={ref}
//         />
//       )}
//     />
//   );
// });
