import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { HttpService } from "../http-request/http.service";

@Component({
  selector: "app-login",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.scss"],
  providers: [HttpService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent implements OnInit {
  public formSubmitted = false;
  public signInForm!: FormGroup<{
    login: FormControl<string | null>;
    password: FormControl<string | null>;
  }>;

  constructor(private router: Router, private httpService: HttpService) {}
  public ngOnInit(): void {
    this.signInForm = new FormGroup({
      login: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
    });
  }

  public testSubmit(): void {
    this.formSubmitted = true;
    if (!this.signInForm.valid) {
      return;
    }
    const { login, password } = this.signInForm.controls;
    this.httpService
      .postDataSignIn(login.value ?? "", password.value ?? "")
      .subscribe({
        next: (response) => {
          localStorage.setItem("token", response.token);
          this.router.navigateByUrl("/welcomePage");
          console.log(response);
        },
        error: (err) => {
          console.log(err);
          alert("ERROR: " + err.error.message);
        },
      });
  }
}
