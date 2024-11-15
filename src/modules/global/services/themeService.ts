// ----------------------------------------------------------------------

type Theme = string;

export interface IThemeService {
  getTheme(): Theme | null;
  changeTheme(theme: 'dark' | 'light'): void;
}

export class ThemeService implements IThemeService {
  public themeKey: string = 'theme-mode';

  public theme: Theme | null;

  constructor() {
    this.theme = this.getTheme();
  }

  private getThemeKey(): string {
    return this.themeKey;
  }

  public getTheme(): Theme | null {
    try {
      const theme = localStorage.getItem(this.getThemeKey());
      if (theme == null) {
        this.createTheme();
        return 'light';
      }
      return theme;
    } catch (err) {
      return null;
    }
  }

  public changeTheme(theme: 'dark' | 'light'): void {
    try {
      localStorage.setItem(this.getThemeKey(), theme);
    } catch (err) {
      //
    }
  }

  public createTheme(): void {
    try {
      localStorage.setItem(this.getThemeKey(), 'light');
    } catch (err) {
      //
    }
  }
}
