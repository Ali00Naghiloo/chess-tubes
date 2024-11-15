// types
import { TypographyProps } from './types';
// styles
import typographyTokens from '../../theme/typo.module.css';
import typographyWeights from '../../theme/typo_weight.module.css';
// ----------------------------------------------------------------------

export default function Typography({
  children,
  weight,
  className = '',
  variant = 'bodyLarge',
  color,
  style,
  ...otherProps
}: TypographyProps) {
  return (
    <p
      {...otherProps}
      style={{ color: color != null ? `var(--${color})` : 'none', ...style }}
      className={` ${!weight ? '' : typographyWeights[`w-${weight}`]}  ${
        typographyTokens[variant]
      } ${className} `}
    >
      {children}
    </p>
  );
}
