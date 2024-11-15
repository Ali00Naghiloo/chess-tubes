// types
import { Colors } from '@/theme/colors';
import { TypographyWeight } from '@/theme/typoWeight';

// ----------------------------------------------------------------------

type TypoName = 'headline' | 'body' | 'display' | 'title' | 'label';
type TypoSize = 'Large' | 'Small' | 'Medium';
type TypoVariant = `${TypoName}${TypoSize}`;

export interface TypographyProps extends React.InputHTMLAttributes<HTMLParagraphElement> {
  children: any;
  className?: string;
  variant?: TypoVariant;
  color?: Colors;
  weight?: TypographyWeight;
}
