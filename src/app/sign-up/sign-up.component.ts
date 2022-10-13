import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { HttpService } from "../http-request/http.service";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [HttpService],
})
export class SignUpComponent implements OnInit {
  public formSubmitted = false;
  public registrationForm!: FormGroup<{
    email: FormControl<string | null>;
    userName: FormControl<string | null>;
    password: FormControl<string | null>;
    repeatPassword: FormControl<string | null>;
    phone: FormControl<string | null>;
  }>;

  constructor(private router: Router, private httpService: HttpService) {}

  public ngOnInit(): void {
    this.registrationForm = new FormGroup(
      {
        email: new FormControl("", [Validators.required, Validators.email]),
        userName: new FormControl("", [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(64),
        ]),
        password: new FormControl("", [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(64),
          this.createPasswordStrengthValidator,
        ]),

        repeatPassword: new FormControl("", [Validators.required]),
        phone: new FormControl("", Validators.pattern("^[0-9]{9,15}")),
      },
      {
        validators: this.identityRevealedValidator,
      }
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

  public createPasswordStrengthValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const value = control.value;
    if (!value) {
      return null;
    }
    const passwordValid = /^(?=.*?[A-Z])(?=.*?[0-9])/.test(value);
    return !passwordValid ? { passwordStrength: value } : null;
  };

  public submit(): void {
    this.formSubmitted = true;
    if (!this.registrationForm.valid) {
      return;
    }
    const { email, userName, password, repeatPassword, phone } =
      this.registrationForm.controls;
    this.httpService
      .postDataSignUP(
        email.value ?? "",
        userName.value ?? "",
        password.value ?? "",
        repeatPassword.value ?? "",
        phone.value ?? ""
      )
      .subscribe({
        next: () => {
          this.router.navigateByUrl("signIn");
        },
      });
  }
}
