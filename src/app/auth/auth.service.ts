import { Injectable } from "@angular/core";

@Injectable()
export class AuthService {
  public setAuthenticated(): boolean {
    const token = localStorage.getItem("token") ?? undefined;
    return !!token;
  }
}
