import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class HttpService {
  constructor(private http: HttpClient) {}

  public postDataSignIn(
    username: string,
    password: string
  ): Observable<unknown> {
    return this.http.post("https://dummyjson.com/auth/login", {
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
  ): Observable<unknown> {
    return this.http.post("https://dummyjson.com/users/add", {
      email,
      userName,
      password,
      repeatPassword,
      phone,
    });
  }
}
