import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {StateResponse} from '../models/StateResponse';
import {Observable} from 'rxjs';
import {HotelResponse} from '../models/HotelResponse';
import {RoomResponse} from '../models/RoomResponse';
import {PriceResponse} from '../models/PriceResponse';
import {HotelRequest} from '../models/HotelRequest';
import {AppointmentResponse} from '../models/AppointmentResponse';
import {RequestWithId} from '../models/RequestWithId';
import {HotelDescriptionResponse} from '../models/HotelDescriptionResponse';

@Component({
  selector: 'app-owner-place',
  templateUrl: './owner-place.component.html',
  styleUrls: ['./owner-place.component.css']
})
export class OwnerPlaceComponent implements OnInit {

  hotelList: HotelResponse[] = [];
  roomList: RoomResponse[] = [];
  priceList: PriceResponse[] = [];
  hotelRequest: HotelRequest = new HotelRequest();
  appointmentList: AppointmentResponse[];
  appointmentRequest: RequestWithId = new RequestWithId();


  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.seeAppointments().subscribe(
      result => {
        this.appointmentList = result;
      },
      error => {
        console.log(error);
      }
    );

    this.showHotels().subscribe(
      result => {
        this.hotelList = result;
        for (const hotel of this.hotelList) {
          this.getRoomsOfHotel(hotel.id);
        }
      },
      error => {
        console.log(error);
      }
    );
  }
  getRoomsOfHotel(id: number) {
    this.showRoomsOfHotels(id).subscribe(
      result => {
        this.roomList = [ ...this.roomList, ...result];
        for (const room of result) {
          this.getPricesOfRoom(room.id);
        }
      },
      error => {
        console.log(error);
      }
    );
  }
  getPricesOfRoom(id: number) {
    this.showPricesOfRooms(id).subscribe(
      result => {
        this.priceList = [ ...this.priceList, ...result];
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

  showRoomsOfHotels(id: number): Observable<RoomResponse[]> {
    let headers2: HttpHeaders = new HttpHeaders();
    headers2 = headers2.append('Content-Type', 'application/json; charset=utf-8');
    headers2 = headers2.append('TOKEN', localStorage.getItem('token'));
    return this.http.post<RoomResponse[]>('http://localhost:8080/getRoomsOfAHotel', id, {headers: headers2});
  }

  showPricesOfRooms(id: number): Observable<PriceResponse[]> {
    let headers2: HttpHeaders = new HttpHeaders();
    headers2 = headers2.append('Content-Type', 'application/json; charset=utf-8');
    headers2 = headers2.append('TOKEN', localStorage.getItem('token'));
    return this.http.post<PriceResponse[]>('http://localhost:8080/getPricesOfRoom', id, {headers: headers2});
  }

  addHotel(): Observable<StateResponse> {
    let headers2: HttpHeaders = new HttpHeaders();
    headers2 = headers2.append('Content-Type', 'application/json; charset=utf-8');
    headers2 = headers2.append('TOKEN', localStorage.getItem('token'));
    // tslint:disable-next-line:radix
    this.hotelRequest.idUser = localStorage.getItem('id');
    return this.http.post<StateResponse>('http://localhost:8080/addHotel', this.hotelRequest, {headers: headers2});
  }

  addHotelCall() {
    this.addHotel().subscribe(
      result => {
        console.table(result);
        if (result) {
          if (result.success === true) {
            console.log('Hotel added succesfully');
          }
          if (result.success === false) {
            console.log('Problems adding hotel');
          }
        }
      },
      // tslint:disable-next-line:no-shadowed-variable
      error => {
        console.log(error);
      }
    );
  }

  modifyHotel(id: number) {
    localStorage.setItem('idHotel', String(id));
    window.location.href = '/about';

  }

  seeAppointments(): Observable<AppointmentResponse[]> {
    let headers2: HttpHeaders = new HttpHeaders();
    headers2 = headers2.append('Content-Type', 'application/json; charset=utf-8');
    headers2 = headers2.append('TOKEN', localStorage.getItem('token'));
    // tslint:disable-next-line:radix
    return this.http.post<AppointmentResponse[]>('http://localhost:8080/getAppointmentsAtAHotel', null, {headers: headers2});
  }

  acceptApp(id: number) {
    this.AcceptApp(id).subscribe(
      result => {
        if (result.success === true) {
          alert('It went well');
        } else {
          alert('It went wrong'); }
      },
      error => {
        console.log(error);
      }
    );
  }

  refuseApp(id: number) {
    this.RefuseApp(id).subscribe(
      result => {
        if (result.success === true) {
          alert('It went good');
        } else {
          alert('It went wrong');
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  AcceptApp(id: number): Observable<StateResponse> {
    let headers2: HttpHeaders = new HttpHeaders();
    headers2 = headers2.append('Content-Type', 'application/json; charset=utf-8');
    headers2 = headers2.append('TOKEN', localStorage.getItem('token'));
    return this.http.post<StateResponse>('http://localhost:8080/acceptAppointment', id, {headers: headers2});
  }

  RefuseApp(id: number): Observable<StateResponse> {
    let headers2: HttpHeaders = new HttpHeaders();
    headers2 = headers2.append('Content-Type', 'application/json; charset=utf-8');
    headers2 = headers2.append('TOKEN', localStorage.getItem('token'));
    return this.http.post<StateResponse>('http://localhost:8080/refuseAppointment', id, {headers: headers2});
  }
}
