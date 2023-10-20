export class UserResponse {
  user: User = new User('','','','','','','','');
}

export class User {
  constructor(
    public _id: string,
    public name: string,
    public surname: string,
    public nick: string,
    public email: string,
    public password: string,
    public role: string,
    public image: string
  ) { }
}

export class Token {
  constructor(
    public gettoken: string,
    public token: string
  ) { }
}


export class ErrorResponse {
  constructor(
    public message: string
  ) { }
}

export type ApiResponse = UserResponse | ErrorResponse | Token;
