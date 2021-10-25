export class Log {
  constructor(
    public id: string,
    public userId: string,
    public loggedIn: boolean,
    public loggedOut: boolean,
    public actions: Array<Action>,
    public errors: Array<Error>,
    public loggedInDate: string,
    public loggedOutDate: string
  ) {}
}

export class Action {
  constructor(
    public actionId: string,
    public actionType: string,
    public actionInfo: string
  ) {}
}

export class Error {
  constructor(
    public errorId: string,
    public errorType: string,
    public errorInfo: string
  ) {}
}
