import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {RoomResponse} from '../models/RoomResponse';
import {HttpClient,  HttpHeaders} from '@angular/common/http';
import {HotelResponse} from '../models/HotelResponse';
import {subscribeOn} from 'rxjs/operators';
import {DescriptionResponse} from '../models/DescriptionResponse';
import {RoomDescriptionResponse} from '../models/RoomDescriptionResponse';
import {FacilityResponse} from '../models/FacilityResponse';
import {PriceResponse} from '../models/PriceResponse';
import {StateResponse} from '../models/StateResponse';
import {PriceRequest} from '../models/PriceRequest';
import {DescriptionRequest} from '../models/DescriptionRequest';
import {RoomDescriptionRequest} from '../models/RoomDescriptionRequest';
import {error} from 'util';
import {FacilityRequest} from '../models/FacilityRequest';
import {RequestWith2Ids} from '../models/RequestWith2Ids';
import {RoomRequest} from '../models/RoomRequest';
import {RequestWithId} from '../models/RequestWithId';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  roomList: RoomResponse[] = [];
  roomDescriptionResponses: RoomDescriptionResponse[] = [];
  descriptionList: DescriptionResponse[] = [];
  hotelList: HotelResponse[] = [];
  facilityList: FacilityResponse[] = [];
  priceList: PriceResponse[] = [];
  priceRequest: PriceRequest = new PriceRequest();
  descriptionRequest: DescriptionRequest = new DescriptionRequest();
  roomDescriptionRequest: RoomDescriptionRequest = new RoomDescriptionRequest();
  roomId: number;
  facilityRequest: FacilityRequest = new FacilityRequest();
  requestWith2Ids: RequestWith2Ids = new RequestWith2Ids();
  roomRequest: RoomRequest = new RoomRequest();
  roomRequest2: RoomRequest = new RoomRequest();

  constructor(private http: HttpClient ) { }

  ngOnInit() {
    this.getHotelsOfOwner().subscribe(
      result1 => {
        this.hotelList = result1;

        for (const hotel of this.hotelList) {
          this.ShowRoomsOfHotel(hotel.id);
         }
      },
      error => {
        console.log(error);
      });
  }
  ShowRoomsOfHotel(id: number) {
    this.showRoomsOfAHotel(id).subscribe(
      result => {
        this.roomList = [ ...this.roomList, ...result];
        for (const room of result) {
          console.log(room.id);
          this.GetRoomDescriptions(room.id);
          this.GetRoomFacilities(room.id);
          this.GetRoomPrices(room.id);
        }
      },
      error => {
        console.log(error);
      }
    );
  }
  getHotelsOfOwner(): Observable<HotelResponse[]> {
    let headers2: HttpHeaders = new HttpHeaders();
    headers2 = headers2.append('Content-Type', 'application/json; charset=utf-8');
    headers2 = headers2.append('TOKEN', localStorage.getItem('token'));
    return this.http.post<HotelResponse[]>('http://localhost:8080/getHotelsOfOwner', null, {headers: headers2});
  }
  showRoomsOfAHotel(id: number): Observable<RoomResponse[]> {
    let headers2: HttpHeaders = new HttpHeaders();
    headers2 = headers2.append('Content-Type', 'application/json; charset=utf-8');
    headers2 = headers2.append('TOKEN', localStorage.getItem('token'));
    // tslint:disable-next-line:radix
    return this.http.post<RoomResponse[]>('http://localhost:8080/getRoomsOfAHotel', id, {headers: headers2});
  }

  getRoomDescriptions(id: number): Observable<RoomDescriptionResponse[]> {
    let headers2: HttpHeaders = new HttpHeaders();
    headers2 = headers2.append('Content-Type', 'application/json; charset=utf-8');
    headers2 = headers2.append('TOKEN', localStorage.getItem('token'));
    // tslint:disable-next-line:radix
    return this.http.post<RoomDescriptionResponse[]>('http://localhost:8080/getDescriptionsOfARoom', id, {headers: headers2});
  }
  GetRoomDescriptions(id: number) {
    this.getRoomDescriptions(id).subscribe(
      result => {
        console.table(result);
        for (const roomDescription of result) {
          this.GetPureDescription(roomDescription.descriptionId, roomDescription.roomId);
        }
        this.roomDescriptionResponses = [ ...this.roomDescriptionResponses, ...result];
      },
      error => { console.log(error); }
    );
  }

  getPureDescription(descriptionId: number): Observable<DescriptionResponse> {
    let headers2: HttpHeaders = new HttpHeaders();
    headers2 = headers2.append('Content-Type', 'application/json; charset=utf-8');
    headers2 = headers2.append('TOKEN', localStorage.getItem('token'));
    // tslint:disable-next-line:radix
    return this.http.post<DescriptionResponse>('http://localhost:8080/getDescriptionById', descriptionId, {headers: headers2});
  }

  GetPureDescription(descriptionId: number, roomId: number) {
    this.getPureDescription(descriptionId).subscribe(
      result => {
        result.idRoom = roomId;
        this.descriptionList.push(result);
      },
      error => { console.log(error); }
    );
  }

  getRoomFacilities(id: number): Observable<FacilityResponse[]>{
    let headers2: HttpHeaders = new HttpHeaders();
    headers2 = headers2.append('Content-Type', 'application/json; charset=utf-8');
    headers2 = headers2.append('TOKEN', localStorage.getItem('token'));
    // tslint:disable-next-line:radix
    return this.http.post<FacilityResponse[]>('http://localhost:8080/getRoomFacilities', id, {headers: headers2});
  }

  GetRoomFacilities(id: number) {
      this.getRoomFacilities(id).subscribe(
        result => {
          result.forEach(data => data.idRoom = id);
          this.facilityList = [ ...this.facilityList, ...result];
        },
        error => { console.log(error); }
      );
  }

  getRoomPrices(id: number): Observable<PriceResponse[]> {
    let headers2: HttpHeaders = new HttpHeaders();
    headers2 = headers2.append('Content-Type', 'application/json; charset=utf-8');
    headers2 = headers2.append('TOKEN', localStorage.getItem('token'));
    return this.http.post<PriceResponse[]>('http://localhost:8080/getPricesOfRoom', id, {headers: headers2});
  }
  GetRoomPrices(id: number) {
    this.getRoomPrices(id).subscribe(
      result => {
        this.priceList = [ ...this.priceList, ...result];
      },
      error => { console.log(error); }
    );
  }

  addPrice(): Observable<StateResponse> {
    let headers2: HttpHeaders = new HttpHeaders();
    headers2 = headers2.append('Content-Type', 'application/json; charset=utf-8');
    headers2 = headers2.append('TOKEN', localStorage.getItem('token'));
    return this.http.post<StateResponse>('http://localhost:8080/addPrice', this.priceRequest, {headers: headers2});
  }
  AddPrice() {
    this.addPrice().subscribe(
      result => {
        if (result.success === true) {
          alert('Price added successfully');
        } else { alert('Price was not added succesfully'); }
      },
      error => {console.log(error); }
    );
  }

  addDescription(): Observable<number> {
    let headers2: HttpHeaders = new HttpHeaders();
    headers2 = headers2.append('Content-Type', 'application/json; charset=utf-8');
    headers2 = headers2.append('TOKEN', localStorage.getItem('token'));
    return this.http.post<number>('http://localhost:8080/addDescription', this.descriptionRequest, {headers: headers2});
  }
  AddDescription() {
    this.addDescription().subscribe(
      result => {
        this.AddRoomDescription(result, this.roomId);
      },
      error1 => { console.log(error1); }
    );
  }

  addRoomDescription(roomDescriptionRequest: RoomDescriptionRequest): Observable<StateResponse> {
    let headers2: HttpHeaders = new HttpHeaders();
    headers2 = headers2.append('Content-Type', 'application/json; charset=utf-8');
    headers2 = headers2.append('TOKEN', localStorage.getItem('token'));
    return this.http.post<StateResponse>('http://localhost:8080/addRoomDescription', roomDescriptionRequest, {headers: headers2});

  }
  AddRoomDescription(idDescription: number, idRoom: number) {
    this.roomDescriptionRequest.descriptionId = idDescription;
    this.roomDescriptionRequest.roomId = idRoom;
    this.roomDescriptionRequest.roomDescriptionType = 'DESCRIPTION';
    this.addRoomDescription(this.roomDescriptionRequest).subscribe(
      result => {
        if (result.success === true) {
          alert('Description was added successfully');
        } else { console.log('An error occurred while adding the room description'); }
      },
      error1 => { console.log(error1); }
    );
  }

  addRoomFacility(idFacility: number, roomId: number): Observable<StateResponse> {
    let headers2: HttpHeaders = new HttpHeaders();
    headers2 = headers2.append('Content-Type', 'application/json; charset=utf-8');
    headers2 = headers2.append('TOKEN', localStorage.getItem('token'));
    this.requestWith2Ids.id1 = roomId;
    this.requestWith2Ids.id2 = idFacility;
    return this.http.post<StateResponse>('http://localhost:8080/addRoomFacility', this.requestWith2Ids, {headers: headers2});
  }
  AddRoomFacility(idFacility: number, roomId: number) {
    this.addRoomFacility(idFacility, roomId).subscribe(
      result => {
        if (result.success === true) {
          alert('Facility was added successfully');
        } else { alert('Error adding facility of room'); }
      },
      error1 => { console.log(error1); }
    );
  }
  addFacility(): Observable<number> {
    let headers2: HttpHeaders = new HttpHeaders();
    headers2 = headers2.append('Content-Type', 'application/json; charset=utf-8');
    headers2 = headers2.append('TOKEN', localStorage.getItem('token'));
    this.facilityRequest.facilityType = 'ROOM';
    return this.http.post<number>('http://localhost:8080/addFacility', this.facilityRequest, {headers: headers2});
  }
  AddFacility() {
    this.addFacility().subscribe(
      result => {
        this.AddRoomFacility(result, this.roomId);
      },
      error1 => { console.log(error1); }
    );
  }

  addRoom(): Observable<StateResponse> {
    let headers2: HttpHeaders = new HttpHeaders();
    headers2 = headers2.append('Content-Type', 'application/json; charset=utf-8');
    headers2 = headers2.append('TOKEN', localStorage.getItem('token'));
    return this.http.post<StateResponse>('http://localhost:8080/addRoom', this.roomRequest, {headers: headers2});
  }
  AddRoom() {
    this.addRoom().subscribe(
      result => {
        if (result.success === true) {
          console.log('room added successfully');
        } else { console.log('error adding room'); }
      },
      error => { console.log(error); }
    );
  }

  updateRoom(): Observable<StateResponse> {
    let headers2: HttpHeaders = new HttpHeaders();
    headers2 = headers2.append('Content-Type', 'application/json; charset=utf-8');
    headers2 = headers2.append('TOKEN', localStorage.getItem('token'));
    return this.http.post<StateResponse>('http://localhost:8080/updateRoom', this.roomRequest2, {headers: headers2});
  }
  UpdateRoom() {
    this.updateRoom().subscribe(
      result => {
        if (result.success === true) {
          console.log('room updated successfully');
        } else { console.log('error updating room'); }
      },
      error => { console.log(error); }
    );
  }

  deleteRoom(id): Observable<StateResponse> {
    let headers2: HttpHeaders = new HttpHeaders();
    headers2 = headers2.append('Content-Type', 'application/json; charset=utf-8');
    headers2 = headers2.append('TOKEN', localStorage.getItem('token'));
    return this.http.post<StateResponse>('http://localhost:8080/deleteRoom', id, {headers: headers2});
  }

  DeleteRoom(id: number) {
    this.deleteRoom(id).subscribe(
      result => {
        if (result.success === true) {
          console.log('room deleted successfully');
        } else { console.log('error deleting room'); }
      },
      error => { console.log(error); }
    );
  }
}

