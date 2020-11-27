import { Injectable } from "@angular/core";
import { User } from "app/Models/User";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { apiBaseURL } from "app/Global/config";
import { loginForm } from "app/Models/loginForm";

@Injectable()
export class GroupsService {
  constructor(private http: HttpClient) {}

  getGroupTypes() {
    return this.http.get(apiBaseURL + "getGroupTypes");
  }

  getGroups() {
    const headers = new HttpHeaders();
    headers.append("Accept", "application/json");
    headers.append("Authorization", "bearer " + localStorage.getItem("token"));

    return this.http.get(apiBaseURL + "group", {
      headers: headers,
    });
  }

  deleteGroup(id: number) {
    return this.http.delete(apiBaseURL + "group/" + id);
  }

  addGroup(group: any) {
    return this.http.post(apiBaseURL + "group", group);
  }

  editGroup(id: number, group: any) {
    return this.http.put(apiBaseURL + "group/" + id, group);
  }

  signupUser(user: User) {
    return this.http.post(apiBaseURL + "user", user);
  }

  signinUser(loginForm: loginForm) {
    return this.http.post(apiBaseURL + "login", loginForm);
  }
}
