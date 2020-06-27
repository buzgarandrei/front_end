import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserResponse} from '../models/UserResponse';
import {FacilityResponse} from '../models/FacilityResponse';
import {DescriptionResponse} from '../models/DescriptionResponse';
import {DescriptionRequest} from '../models/DescriptionRequest';
import {FacilityRequest} from '../models/FacilityRequest';
import {Observable} from 'rxjs';
import {StateResponse} from '../models/StateResponse';
import {RequestWithId} from '../models/RequestWithId';
import {error} from 'util';

@Component({
  selector: 'app-admin-place',
  templateUrl: './admin-place.component.html',
  styleUrls: ['./admin-place.component.css']
})
export class AdminPlaceComponent implements OnInit {

  userList: UserResponse[];
  facilityList: FacilityResponse[];
  descriptionList: DescriptionResponse[];
  description: DescriptionRequest = new DescriptionRequest();
  description1: DescriptionRequest = new DescriptionRequest();
  requestWithId: RequestWithId = new RequestWithId();
  facility: FacilityRequest = new FacilityRequest();
  facility1: FacilityRequest = new FacilityRequest();

  constructor(private http: HttpClient) { }

  ngOnInit() {

    this.show().subscribe(
      result => {
        console.table(result);
        this.userList = result;
      },
      error => {
        console.log(error);
      }
    );


    this.showFacilities().subscribe(
      result => {
        console.table(result);
        if (result) {
          this.facilityList = result;
        }},
      error => {
        console.log(error);
      }
    );
    this.showDescriptions().subscribe(
      result => {
        console.table(result);
        this.descriptionList = result;
      },
      error => {
        console.log(error);
      }
    );

  }

  show(): Observable<UserResponse[]> {
    let headers2: HttpHeaders = new HttpHeaders();
    headers2 = headers2.append('Content-Type', 'application/json; charset=utf-8');
    headers2 = headers2.append('TOKEN', localStorage.getItem('token'));
    return this.http.post<UserResponse[]>('http://localhost:8080/getUsers', null, {headers: headers2});
  }

  showFacilities(): Observable<FacilityResponse[]> {
    let headers2: HttpHeaders = new HttpHeaders();
    headers2 = headers2.append('Content-Type', 'application/json; charset=utf-8');
    headers2 = headers2.append('TOKEN', localStorage.getItem('token'));
    return this.http.post<FacilityResponse[]>('http://localhost:8080/getFacilities', null, {headers: headers2});
  }

  showDescriptions(): Observable<DescriptionResponse[]> {
    let headers2: HttpHeaders = new HttpHeaders();
    headers2 = headers2.append('Content-Type', 'application/json; charset=utf-8');
    headers2 = headers2.append('TOKEN', localStorage.getItem('token'));
    return this.http.post<DescriptionResponse[]>('http://localhost:8080/getDescriptions', null, {headers: headers2});
  }

  AddDescription(): Observable<StateResponse> {
    let headers2: HttpHeaders = new HttpHeaders();
    headers2 = headers2.append('Content-Type', 'application/json; charset=utf-8');
    headers2 = headers2.append('TOKEN', localStorage.getItem('token'));
    alert(this.description.language + ' ' + this.description.text);
    return this.http.post<StateResponse>('http://localhost:8080/addDescription', this.description, {headers: headers2});
  }
  addDescription() {
    this.AddDescription().subscribe(
      result => {
        alert(result);
      },
      error2 => { console.log(error2); }
    );
  }

  updateDescription(): Observable<StateResponse> {
    let headers2: HttpHeaders = new HttpHeaders();
    headers2 = headers2.append('Content-Type', 'application/json; charset=utf-8');
    headers2 = headers2.append('TOKEN', localStorage.getItem('token'));
    return this.http.post<StateResponse>('http://localhost:8080/updateDescription', this.description1, {headers: headers2});
  }
  UpdateDescription() {
    this.updateDescription().subscribe(
      result => {
        if (result.success === true) {
          console.log('description updated usccessfully');
        } else { console.log('error updating description'); }
      },
      error1 => { console.log(error1); }
    );
  }

  deleteDescription(id: number): Observable<StateResponse> {
    let headers2: HttpHeaders = new HttpHeaders();
    headers2 = headers2.append('Content-Type', 'application/json; charset=utf-8');
    headers2 = headers2.append('TOKEN', localStorage.getItem('token'));
    return this.http.post<StateResponse>('http://localhost:8080/deleteDescription', id, {headers: headers2});
  }
  DeleteDescription(id: number) {
    this.deleteDescription(id).subscribe(
      result => {
        if (result.success === true) {
          console.log('description deleted successfully');
        } else { console.log('error deleting description'); }
      },
      error1 => { console.log(error1); }
    );
  }

  AddFacility(): Observable<StateResponse> {
    let headers2: HttpHeaders = new HttpHeaders();
    headers2 = headers2.append('Content-Type', 'application/json; charset=utf-8');
    headers2 = headers2.append('TOKEN', localStorage.getItem('token'));
    return this.http.post<StateResponse>('http://localhost:8080/addFacility', this.facility, {headers: headers2});
  }
  addFacility() {
    this.AddFacility().subscribe(
      result => {
        alert(result.success);
      },
      error1 => {
        console.log(error1);
      }
    );
  }

  updateFacility(): Observable<StateResponse> {
    let headers2: HttpHeaders = new HttpHeaders();
    headers2 = headers2.append('Content-Type', 'application/json; charset=utf-8');
    headers2 = headers2.append('TOKEN', localStorage.getItem('token'));
    return this.http.post<StateResponse>('http://localhost:8080/updateFacility', this.facility1, {headers: headers2});
  }
  UpdateFacility() {
    this.updateFacility().subscribe(
      result => {
        if (result.success === true) {
          console.log('facility updated successfully');
        } else { console.log('error updating facility'); }
      },
      error1 => { console.log(error1); }
    );
  }

  deleteFacility(id: number): Observable<StateResponse> {
    let headers2: HttpHeaders = new HttpHeaders();
    headers2 = headers2.append('Content-Type', 'application/json; charset=utf-8');
    headers2 = headers2.append('TOKEN', localStorage.getItem('token'));
    return this.http.post<StateResponse>('http://localhost:8080/deleteFacility', id, {headers: headers2});
  }
  DeleteFacility(id: number) {
    this.deleteFacility(id).subscribe(
      result => {
        if (result.success === true) {
          console.log('facility deleted successfully');
        } else { console.log('error deleting facility'); }
      },
      error1 => { console.log(error1); }
    );
  }

  MakeBasicUser(id: number): Observable<StateResponse> {
    let headers2: HttpHeaders = new HttpHeaders();
    headers2 = headers2.append('Content-Type', 'application/json; charset=utf-8');
    headers2 = headers2.append('TOKEN', localStorage.getItem('token'));
    alert(id);
    return this.http.post<StateResponse>('http://localhost:8080/makeBasicUser', id, {headers: headers2});
  }
  makeBasicUser(id: number) {
    this.MakeBasicUser(id).subscribe(
      result => {
        if (result.success === true) {
          alert('User role changed successfully to Basic User');
        } else { console.log('Error trying to change user role to Basic User'); }
      },
      error => { console.log(error); }
    );
  }

  MakePremiumUser(id: number): Observable<StateResponse> {
    let headers2: HttpHeaders = new HttpHeaders();
    headers2 = headers2.append('Content-Type', 'application/json; charset=utf-8');
    headers2 = headers2.append('TOKEN', localStorage.getItem('token'));
    return this.http.post<StateResponse>('http://localhost:8080/makePremiumUser', id, {headers: headers2});
  }
  makePremiumUser(id: number) {
    this.MakePremiumUser(id).subscribe(
      result => {
        if (result.success === true) {
          alert('User role changed successfully to Premium User');
        } else { console.log('Error changing role to Premium User'); }
      },
      error => { console.log(error); }
    );
  }

  MakeOwner(id: number): Observable<StateResponse> {
    let headers2: HttpHeaders = new HttpHeaders();
    headers2 = headers2.append('Content-Type', 'application/json; charset=utf-8');
    headers2 = headers2.append('TOKEN', localStorage.getItem('token'));
    return this.http.post<StateResponse>('http://localhost:8080/makeOwner', id, {headers: headers2});
  }
  makeOwner(id: number) {
    this.MakeOwner(id).subscribe(
      result => {
        if (result.success === true) {
          alert('User role changed successfully to Owner');
        } else { console.log('Error changing role to Owner'); }
      },
      error => { console.log(error); }
    );
  }

  MakeAdmin(id: number): Observable<StateResponse>  {
    let headers2: HttpHeaders = new HttpHeaders();
    headers2 = headers2.append('Content-Type', 'application/json; charset=utf-8');
    headers2 = headers2.append('TOKEN', localStorage.getItem('token'));
    return this.http.post<StateResponse>('http://localhost:8080/makeAdmin', id, {headers: headers2});
  }
  makeAdmin(id: number) {
    this.MakeAdmin(id).subscribe(
      result => {
        if (result.success === true) {
          alert('User role changed to General Admin');
        } else { console.log('Error changing role to General Admin'); }
      },
      error => {  console.log(error); }
    );
  }
}
