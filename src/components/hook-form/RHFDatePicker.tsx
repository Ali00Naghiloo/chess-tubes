// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers';

// ----------------------------------------------------------------------

type Props = DatePickerProps<Date> & {
  name: string;
  disableError?: boolean;
  shrinkLabel?: boolean;
};

export default function RHFDatePicker({
  name,
  disableError,
  shrinkLabel = false,
  ...other
}: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <DatePicker {...field} value={new Date(field.value ** 1000)} {...other} />
      )}
    />
  );
}
