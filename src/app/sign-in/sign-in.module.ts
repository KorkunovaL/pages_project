import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SignInRoutingModule } from "./sign-in-routing.module";
import { SignInComponent } from "./sign-in.component";
import { AppComponent } from "../app.component";

@NgModule({
  declarations: [SignInComponent],
  imports: [
    CommonModule,
    SignInRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [SignInComponent],
})
export class SignInModule {}
