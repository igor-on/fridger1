export class User {
  constructor(
    public username: string,
    public tokenData: TokenData
  ) {}

  get token() {
    if (new Date() > this.tokenData.expirationDate) {
      return null;
    }
    return this.tokenData.token;
  }
}

class TokenData {
  constructor(
    public token: string,
    public expirationDate: Date
  ) {}
}
