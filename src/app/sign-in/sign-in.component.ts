import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent {
  constructor(private router: Router) {}
  signInForm: FormGroup = new FormGroup({
    login: new FormControl([], Validators.required),
    password: new FormControl([], Validators.required),
  });
  submit() {
    console.log(this.signInForm);
    fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: this.signInForm.value.login,
        password: this.signInForm.value.password,
      }),
    }).then((res) => {
      this.router.navigateByUrl("/welcomePage");
    });
  }
}
