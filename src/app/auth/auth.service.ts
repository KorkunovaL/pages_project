import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
@Injectable()
export class AuthService {
  constructor() {}

  public setAuthenticated(): boolean {
    const token = localStorage.getItem("token") ?? undefined;
    return !!token;
  }
}
