export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'filled' | 'text';
  isLoading?: boolean;
  fullWidth?: boolean;
}
