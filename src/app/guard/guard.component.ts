import { createInjectableType } from "@angular/compiler";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { Injectable } from "@angular/core";

@Injectable()
export class GuardComponent implements CanActivate {
  constructor(private router: Router) {}

  canActivate() {
    const token = localStorage.getItem("token");
    console.log("inside", token);
    if (token) {
      return true;
    } else {
      this.router.navigate(["/signIn"]);
      return false;
    }
  }
}
