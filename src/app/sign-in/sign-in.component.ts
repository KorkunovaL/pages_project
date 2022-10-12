import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-login",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent {
  public signInForm: FormGroup = new FormGroup({
    login: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
  });
  constructor(private router: Router, private http: HttpClient) {}

  public testSubmit(): void {
    const payload = JSON.stringify({
      username: this.signInForm.value.login,
      password: this.signInForm.value.password,
    });
    this.http
      .post("https://dummyjson.com/auth/login", payload, {
        headers: { "Content-Type": "application/json" },
      })
      .subscribe({
        next: (response: any) => {
          localStorage.setItem("token", response.token);
          this.router.navigateByUrl("/welcomePage");
          console.log(response);
        },
        error: () => {
          alert("ERROR, user doesn't exist!");
        },
      });
  }
}
