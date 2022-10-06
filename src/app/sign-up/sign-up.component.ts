import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { Router } from "@angular/router";
import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent {
  constructor(private router: Router) {}
  registrationForm: FormGroup = new FormGroup({
    email: new FormControl([], [Validators.required, Validators.email]),
    userName: new FormControl(
      [],
      [Validators.required, Validators.minLength(4), Validators.maxLength(64)]
    ),
    password: new FormControl(
      [],
      [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(64),
        this.createPasswordStrengthValidator(),
      ]
    ),

    repeatPassword: new FormControl(
      [],
      [
        Validators.required,
        // this.createPasswordMatch("password", "repeatPassword"),
      ]
    ),
    phone: new FormControl([], Validators.pattern("^[0-9_-]{9,15}")),
  });

  createPasswordStrengthValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      console.log("start");
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

  submit() {
    console.log(this.registrationForm);
    fetch("https://dummyjson.com/users/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.registrationForm.value.email,
        userName: this.registrationForm.value.userName,
        password: this.registrationForm.value.password,
        phone: this.registrationForm.value.phone,
      }),
    }).then(() => this.router.navigateByUrl("signIn"));
  }
}
