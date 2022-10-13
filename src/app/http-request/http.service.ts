import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

type SignInResult = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
};

type SignUpResult = {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
};

@Injectable()
export class HttpService {
  constructor(private http: HttpClient) {}

  public postDataSignIn(
    username: string,
    password: string
  ): Observable<SignInResult> {
    return this.http.post<SignInResult>("https://dummyjson.com/auth/login", {
      username,
      password,
    });
  }

  public postDataSignUP(
    email: string,
    userName: string,
    password: string,
    repeatPassword: string,
    phone: string
  ): Observable<SignUpResult> {
    return this.http.post<SignUpResult>("https://dummyjson.com/users/add", {
      email,
      userName,
      password,
      repeatPassword,
      phone,
    });
  }
}
