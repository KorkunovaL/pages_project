import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SignInModule } from "./sign-in/sign-in.module";
import { SignUpModule } from "./sign-up/sign-up.module";

import { AuthService } from "./auth/auth.service";
import { AuthGuardService } from "./auth/auth-guard.service";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SignInModule,
    SignUpModule,
  ],
  bootstrap: [AppComponent],
  providers: [AuthService, AuthGuardService],
})
export class AppModule {}
