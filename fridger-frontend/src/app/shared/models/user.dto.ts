export class UserDTO {
  constructor(
    public username: string,
    public firstName: string,
    public lastName: string,
    public email: string,
    public joined: Date
  ) {}
}
