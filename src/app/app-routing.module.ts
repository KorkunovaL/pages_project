import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
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
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
