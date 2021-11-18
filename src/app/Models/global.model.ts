export class Breakpoints {
  constructor(
    public xs: boolean = false,
    public sm: boolean = false,
    public md: boolean = false,
    public lg: boolean = false,
    public xl: boolean = false
  ) {}
}

export class Auth {
  constructor(
    public isAuthenticated: boolean = false,
    public role: string = '',
    public isUser: boolean = false,
    public isAdmin: boolean = false,
    public authToken: string = '',
    public userName: string = ''
  ) {}
}
