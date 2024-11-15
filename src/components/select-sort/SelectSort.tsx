import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

// ----------------------------------------------------------------------

type SortSelectProps = {
  filter: string;
  setFilter: any;
  sortItems: SortItem[];
};

type SortItem = {
  label: string;
  value: string;
};

export default function SortSelect({ filter, setFilter, sortItems }: SortSelectProps) {
  const handleChange = (e: SelectChangeEvent) => {
    setFilter(e.target.value);
  };

  return (
    <FormControl sx={{ width: 200 }} size="small">
      <InputLabel id="sort-select-label">مرتب سازی بر اساس</InputLabel>
      <Select
        labelId="sort-select-label"
        value={filter}
        label="مرتب سازی بر اساس"
        onChange={handleChange}
      >
        {sortItems.map((item) => (
          <MenuItem dir="rtl" key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
