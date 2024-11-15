// components
import Logo from '@/components/logo/Logo';
// styles
import styles from './styles.module.css';

// ----------------------------------------------------------------------

type Props = {
  title?: string;
  illustration?: string;
  illustrationCom?: React.ReactNode;
  children: React.ReactNode;
};

export default function LoginLayout({ children, illustration, illustrationCom, title }: Props) {
  return (
    <div className={styles.con}>
      <div className={styles.right}>
        <Logo sx={{ width: 180 }} />
        {children}
      </div>

      <div className={styles.left}>{illustrationCom}</div>
    </div>
  );
}
