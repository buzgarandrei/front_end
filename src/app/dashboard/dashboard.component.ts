import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {AppointmentResponse} from '../models/AppointmentResponse';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Global} from '../commons/Global';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  appointments: AppointmentResponse[];
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getAppointments().subscribe(
      result => {
        if (result) {
          this.appointments = result;
        }},
      error => {
        console.log(error);
      }
    );
  }
  getAppointments(): Observable<AppointmentResponse[]> {
    let headers2: HttpHeaders = new HttpHeaders();
    headers2 = headers2.append('Content-Type', 'application/json; charset=utf-8');
    headers2 = headers2.append('TOKEN', localStorage.getItem('token'));
    return this.http.post<AppointmentResponse[]>(Global.domainName + 'getUserAppointments', null, {headers: headers2});
  }
}
