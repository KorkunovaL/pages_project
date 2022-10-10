import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent implements OnInit {
  public registrationForm!: FormGroup;

  constructor(private router: Router, private http: HttpClient) {}

  public ngOnInit(): void {
    this.registrationForm = new FormGroup(
      {
        email: new FormControl([], [Validators.required, Validators.email]),
        userName: new FormControl(
          [],
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(64),
          ]
        ),
        password: new FormControl(
          [],
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(64),
            this.createPasswordStrengthValidator(),
          ]
        ),

        repeatPassword: new FormControl(
          [],
          [Validators.required, this.identityRevealedValidator]
        ),
        phone: new FormControl([], Validators.pattern("^[0-9_-]{9,15}")),
      },
      { validators: this.identityRevealedValidator }
    );
  }

  public identityRevealedValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const pass = control.get("password");
    const confirmPassword = control.get("repeatPassword");

    return pass && confirmPassword && pass.value !== confirmPassword.value
      ? { identityRevealed: true }
      : null;
  };

  public createPasswordStrengthValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return null;
      }
      const hasUpperCase = /[A-Z]+/.test(value);
      const hasNumber = /[0-9]+/.test(value);
      const passwordValid = hasUpperCase && hasNumber;
      return !passwordValid
        ? { passwordStrength: { hasUpperCase: true, hasNumber: true } }
        : null;
    };
  }
  public submit(): void {
    const payload = JSON.stringify({
      email: this.registrationForm.value.email,
      username: this.registrationForm.value.login,
      password: this.registrationForm.value.password,
      repeatPassword: this.registrationForm.value.repeatPassword,
      phone: this.registrationForm.value.phone,
    });
    this.http
      .post("https://dummyjson.com/users/add", payload, {
        headers: { "Content-Type": "application/json" },
      })
      .subscribe({
        next: (response: any) => {
          localStorage.setItem("token", response.token);
          this.router.navigateByUrl("signIn");
          console.log(response);
        },
      });
  }
}
