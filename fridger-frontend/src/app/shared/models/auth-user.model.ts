export class AuthUser {
  constructor(
    public username: string,
    private _token: string,
    private _tokenExpiration: Date
  ) {}

  get token(): string | null {
    if (!this._tokenExpiration || new Date() > this._tokenExpiration) {
      return null;
    }

    return this._token;
  }
}
