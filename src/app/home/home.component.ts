import { Component, OnInit } from '@angular/core';
import {SearchResponse} from '../models/SearchResponse';
import {AppointmentResponse} from '../models/AppointmentResponse';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FacilityResponse} from '../models/FacilityResponse';
import {SearchRequest} from '../models/SearchRequest';
import {AppointmentRequest} from '../models/AppointmentRequest';
import {$} from 'protractor';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  search: SearchRequest = new SearchRequest();
  searchResult: SearchResponse[];
  make: AppointmentRequest = new AppointmentRequest();
  response: AppointmentResponse;
  searchResult2: SearchResponse[];

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    /*const i = 0;
    if (i === 0) {
      window.localStorage.clear();
    }
    alert(localStorage.getItem('role'));*/
  }


  Search(): Observable<SearchResponse[]> {
    let headers2: HttpHeaders = new HttpHeaders();
    headers2 = headers2.append('Content-Type', 'application/json; charset=utf-8');
    headers2 = headers2.append('TOKEN', localStorage.getItem('token'));
    return this.http.post<SearchResponse[]>('http://localhost:8080/search', this.search, {headers: headers2});
  }

  doSearch() {
    this.Search().subscribe(
      result => {
        alert(result);
        console.table(result);
        if (result) {
          this.searchResult = result;
        }
      },
        error => { console.log(error); }
    );
  }

  parse(roomFacilities: FacilityResponse[]) {
    let stringg = '';
    for (const facility of roomFacilities) {
      stringg = stringg + ' ' + facility.facilityName + ', ';
    }
    return stringg;
  }

  makeAppointment(idRoom: number, startDate: string, endDate: string, total: number): Observable<AppointmentResponse> {
    let headers2: HttpHeaders = new HttpHeaders();
    headers2 = headers2.append('Content-Type', 'application/json; charset=utf-8');
    headers2 = headers2.append('TOKEN', localStorage.getItem('token'));
    this.make.startDate = startDate;
    this.make.endDate = endDate;
    this.make.roomId = idRoom;
    if (total > 10) {
      return this.http.post<AppointmentResponse>('http://localhost:8080/makeAppointment', this.make, {headers: headers2});
    }
    alert('Can not book that one!');
  }

  doMakeAppointment(idRoom: number, startDate: string, endDate: string, total: number) {
    this.makeAppointment(idRoom, startDate, endDate, total).subscribe(
      result => {
        alert(result);
        console.table(result);
        if (result) {
          alert('appointment made succesfully!!');
          this.response = result;
          document.getElementById('div1').style.visibility = 'visible';
        } else { alert('Error making appointment'); }
      },
      error => {
        console.log(error);
        alert('Shit job');
      }
    );
  }

  redirect(iterator: SearchResponse) {


    window.location.href = '/about';
  }
}

