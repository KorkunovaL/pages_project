import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem("token");
    if (!token) {
      this.router.navigate(["signIn"]);
      return false;
    }
    return true;
  }
}
