import { Component } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
})
@Injectable()
export class AppComponent {
  constructor(public router: Router) {}
}
