import { Component, OnInit } from '@angular/core';
import {HotelDescriptionResponse} from '../models/HotelDescriptionResponse';
import {HotelResponse} from '../models/HotelResponse';
import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FacilityResponse} from '../models/FacilityResponse';
import {DescriptionResponse} from '../models/DescriptionResponse';
import {DescriptionRequest} from '../models/DescriptionRequest';
import {StateResponse} from '../models/StateResponse';
import {FacilityRequest} from '../models/FacilityRequest';
import {RequestWith2Ids} from '../models/RequestWith2Ids';
import {RoomRequest} from '../models/RoomRequest';
import {RequestWithId} from '../models/RequestWithId';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})
export class HotelComponent implements OnInit {

  hotelDescriptionList: HotelDescriptionResponse[] = [];
  descriptionList: DescriptionResponse[] = [];
  idList: number[] = [];
  hotelList: HotelResponse[] = [];
  hotelFacilitiesList: FacilityResponse[] = [];
  descriptionRequest: DescriptionRequest = new DescriptionRequest();
  hotelId: number;
  facilityId: number;
  facilityRequest: FacilityRequest = new FacilityRequest();
  requestWith2Ids: RequestWith2Ids = new RequestWith2Ids();


  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.showHotels().subscribe(
      result => {
        this.hotelList = result;
        for (const hotel of this.hotelList) {
          this.getFacilitiesOfHotel(hotel.id);
          this.GetHotelDescriptions(hotel.id);
        }
      },
      error => {
        console.log(error);
      }
    );
  }
  showHotels(): Observable<HotelResponse[]> {
    let headers2: HttpHeaders = new HttpHeaders();
    headers2 = headers2.append('Content-Type', 'application/json; charset=utf-8');
    headers2 = headers2.append('TOKEN', localStorage.getItem('token'));
    return this.http.post<HotelResponse[]>('http://localhost:8080/getHotelsOfOwner', null, {headers: headers2});
  }
  getHotelFacilities(id: number): Observable<FacilityResponse[]> {
    let headers2: HttpHeaders = new HttpHeaders();
    headers2 = headers2.append('Content-Type', 'application/json; charset=utf-8');
    headers2 = headers2.append('TOKEN', localStorage.getItem('token'));
    return this.http.post<FacilityResponse[]>('http://localhost:8080/getHotelFacilities', id, {headers: headers2});
  }
  getHotelDescription(id: number): Observable<HotelDescriptionResponse[]> {
    let headers2: HttpHeaders = new HttpHeaders();
    headers2 = headers2.append('Content-Type', 'application/json; charset=utf-8');
    headers2 = headers2.append('TOKEN', localStorage.getItem('token'));
    return this.http.post<HotelDescriptionResponse[]>('http://localhost:8080/getDescriptionsOfAHotel', id, {headers: headers2});
  }
  getFacilitiesOfHotel(id: number) {
    this.getHotelFacilities(id).subscribe(
      result => {
        result.forEach(data => data.idHotel = id);
        this.hotelFacilitiesList = [ ...this.hotelFacilitiesList, ...result];
      },
      error => {console.log(error); }
    );
  }
  GetHotelDescriptions(id: number) {
    this.getHotelDescription(id).subscribe(
      result => {
        for (const item of result) {
          this.GetDescription(item.descriptionId, item.hotelId);
        }
      },
      error => {console.log(error); }
    );
  }

  getDescription(id: number): Observable<DescriptionResponse> {
    let headers2: HttpHeaders = new HttpHeaders();
    headers2 = headers2.append('Content-Type', 'application/json; charset=utf-8');
    headers2 = headers2.append('TOKEN', localStorage.getItem('token'));
    return this.http.post<DescriptionResponse>('http://localhost:8080/getDescriptionById', id, {headers: headers2});
  }

  GetDescription(id: number, hotelId: number) {
    this.getDescription(id).subscribe(
      result => {
        result.idHotel = hotelId;
        this.descriptionList.push(result);
      },
      error => {console.log(error); }
    );
  }
  addDescription(): Observable<any> {
    let headers2: HttpHeaders = new HttpHeaders();
    headers2 = headers2.append('Content-Type', 'application/json; charset=utf-8');
    headers2 = headers2.append('TOKEN', localStorage.getItem('token'));
    const body = { language: this.descriptionRequest.language, text: this.descriptionRequest.text };
    return this.http.post<any>('http://localhost:8080/addDescription', body, {headers: headers2});
  }
  AddDescription() {
    this.addDescription().subscribe(
      result => {
        this.descriptionRequest.id = result;
        this.AddHotelDescription(this.descriptionRequest.id);
      },
      error => { console.log(error); }
    );
  }
  addHotelDescription(idDescr: number): Observable<StateResponse> {
    let headers2: HttpHeaders = new HttpHeaders();
    headers2 = headers2.append('Content-Type', 'application/json; charset=utf-8');
    headers2 = headers2.append('TOKEN', localStorage.getItem('token'));
    const description: HotelDescriptionResponse = new HotelDescriptionResponse();
    description.hotelDescriptionType = 'DESCRIPTION';
    description.hotelId = this.hotelId;
    description.descriptionId = idDescr;
    return this.http.post<StateResponse>('http://localhost:8080/addHotelDescription', description , {headers: headers2});
  }
  AddHotelDescription(idDescr: number) {
    this.addHotelDescription(idDescr).subscribe(
      result => {
        if (result.success === true) {
          alert('The description was added succesfully');
        } else { alert('The description was not added '); }
      },
      error => { console.log(error); }
    );
  }
  addFacility(): Observable<number> {
    let headers2: HttpHeaders = new HttpHeaders();
    headers2 = headers2.append('Content-Type', 'application/json; charset=utf-8');
    headers2 = headers2.append('TOKEN', localStorage.getItem('token'));
    this.facilityRequest.facilityType = 'HOTEL';
    return this.http.post<any>('http://localhost:8080/addFacility', this.facilityRequest, {headers: headers2});
  }
  AddFacility() {
    this.addFacility().subscribe(
      result => {
        this.facilityId = result;
        this.AddHotelFacility(this.hotelId, this.facilityId);
      },
      error => { console.log(error); }
    );
  }
  AddHotelFacility(id1: number, id2: number) {
    this.addHotelFacility(id1, id2).subscribe(
      result => {
        if (result.success === true) {
          alert('facility added successfully');
        } else { alert('facility was not added'); }
      },
      error => { console.log(error); }
    );
  }
  addHotelFacility(id1: number, id2: number): Observable<StateResponse> {
    let headers2: HttpHeaders = new HttpHeaders();
    headers2 = headers2.append('Content-Type', 'application/json; charset=utf-8');
    headers2 = headers2.append('TOKEN', localStorage.getItem('token'));
    this.requestWith2Ids.id1 = id1;
    this.requestWith2Ids.id2 = id2;
    return this.http.post<any>('http://localhost:8080/addHotelFacility', this.requestWith2Ids, {headers: headers2});
  }
}
