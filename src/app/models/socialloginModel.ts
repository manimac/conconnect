export class socialLoginModel {
  constructor(
    public UserName: string,
    public Token: string,
    public Gateway: number,
    public Role:string
  ) { }
}
