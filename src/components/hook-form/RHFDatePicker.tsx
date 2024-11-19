// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers';
import moment from 'jalali-moment';

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
      render={({ field, fieldState: { error } }) => {
        const date = new Date(field.value * 1000);
        console.log(moment(date).locale('fa'));

        return <DatePicker {...field} value={date} {...other} />;
      }}
    />
  );
}
