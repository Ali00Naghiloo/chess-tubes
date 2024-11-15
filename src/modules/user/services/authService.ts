// ----------------------------------------------------------------------

type Token = string;

export interface IAuthService {
  isAuthenticated(): boolean;
  getToken(): Token | null;
  setToken(token: Token): void;
  removeToken(): void;
}

export class AuthService implements IAuthService {
  public tokenKey: string = 'chess-tubes-token';

  public token: Token | null;

  constructor() {
    this.token = this.getToken();
  }

  private getTokenKey(): string {
    return this.tokenKey;
  }

  public getToken(): Token | null {
    try {
      const token = localStorage.getItem(this.getTokenKey());
      return token || null;
    } catch (err) {
      return null;
    }
  }

  public setToken(token: string): void {
    try {
      const tokenKey = this.getTokenKey();
      localStorage.setItem(tokenKey, token);
    } catch (err) {
      //
    }
  }

  public removeToken(): void {
    try {
      const tokenKey = this.getTokenKey();
      localStorage.removeItem(tokenKey);
    } catch (err) {
      //
    }
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }
}
