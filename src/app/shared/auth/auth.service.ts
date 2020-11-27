import { Injectable } from '@angular/core';
import { User } from 'app/Models/User';
import { HttpClient } from '@angular/common/http';
import { apiBaseURL } from 'app/Global/config';
import { loginForm } from 'app/Models/loginForm';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  token: string;

  constructor(private http:HttpClient,private router: Router) {}

  signupUser(user:User) {
    return this.http.post(apiBaseURL + "user" , user);
  }

  signinUser(loginForm:loginForm) {
    return this.http.post(apiBaseURL + "login" , loginForm);
  }

  logout() {   
    localStorage.clear();
    this.router.navigate(["login"]);
  }

  getToken() {    
    return localStorage.getItem("token");
  }

  isAuthenticated() {
   return this.getToken() ? true : false;
  }
}

