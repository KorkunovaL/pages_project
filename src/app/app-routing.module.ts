import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuardService as AuthGuard } from "./auth/auth-guard.service";

const routes: Routes = [
  { path: "", redirectTo: "signIn", pathMatch: "full" },

  {
    path: "signIn",

    loadChildren: () =>
      import("./sign-in/sign-in.module").then((m) => m.SignInModule),
  },
  {
    path: "signUp",
    loadChildren: () =>
      import("./sign-up/sign-up.module").then((m) => m.SignUpModule),
  },
  {
    path: "welcomePage",
    loadChildren: () =>
      import("./welcome-page/welcome-page.module").then(
        (m) => m.WelcomePageModule
      ),
    canActivate: [AuthGuard],
  },
  { path: "**", redirectTo: "signIn" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
