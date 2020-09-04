import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserResponse} from '../models/UserResponse';
import {UserRequest} from '../models/UserRequest';
import {Observable} from 'rxjs';
import {StateResponse} from '../models/StateResponse';
import {Global} from '../commons/Global';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private userRequest: UserRequest = new UserRequest();
  private userRequest2: UserRequest = new UserRequest();
  private userResponse: UserResponse = new UserResponse();

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    document.getElementById('AddUserDiv').style.visibility = 'show';
  }

  showAddUserForm() {
    document.getElementById('AddUserDiv').style.visibility = 'show';
  }

  login(): Observable<UserResponse> {
    return this.http.post<UserResponse>(Global.domainName + 'login', this.userRequest);
  }

  addUser(): Observable<StateResponse> {
    return this.http.post<StateResponse>(Global.domainName + 'addUser', this.userRequest2);
  }

  interpretUser() {
    this.addUser().subscribe(
      result => {
        console.table(result);
        if (result) {
          if (result.success === true) {
            alert('User added successfully');
          }
          if (result.success === false) {
            alert('Problems adding user');
          }
        }
      },
      // tslint:disable-next-line:no-shadowed-variable
      error => {
        console.log(error);
      }
    );
  }

  interpretResult() {
    this.login().subscribe(
      result => {
        console.table(result);
        if (result) {
          console.log('Welcome dear ' + result.name + ', with role of ' + result.roleEnum + ', with token:' + result.token);
          localStorage.setItem('token', result.token);
          localStorage.setItem('role', result.roleEnum);
          localStorage.setItem('id', String(result.id));
          alert('Welcome dear ' + result.name + ', with role of ' + result.roleEnum);
        }
      },
      // tslint:disable-next-line:no-shadowed-variable
      error => {
        console.log(error);
      }
    );
  }

  logOut(): Observable<StateResponse> {
    let headers2: HttpHeaders = new HttpHeaders();
    headers2 = headers2.append('Content-Type', 'application/json; charset=utf-8');
    headers2 = headers2.append('TOKEN', localStorage.getItem('token'));
    return this.http.get<StateResponse>(Global.domainName + 'logout', {headers: headers2});
  }
  LogOut() {
    this.logOut().subscribe(
      result => {
        localStorage.clear();
        if (result.success === true) {
          console.log('Logout occurred with success');
          localStorage.clear();
        } else {
          console.log('Error while logging out');
          localStorage.clear(); }
      },
      error => { console.log(error); }
    );
  }
}
