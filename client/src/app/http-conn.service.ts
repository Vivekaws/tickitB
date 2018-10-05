import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { paths } from './Strings/Strings';

import { Observable } from 'rxjs';





@Injectable({
  providedIn: 'root'
})

export class HttpConnService {
  BASE_URL = paths.serverUrl

  constructor(private http: HttpClient) {
  }

  getUnavailableSeats(date) {
    return this.http.get(this.BASE_URL + "getUnavailableSeats/" + date.toString());
  }

  lockSeat(seat) {
    return this.http.post<any>(this.BASE_URL + "lockSeat", seat);
  }

  bookSeat(ticketId) {
    return this.http.post<any>(this.BASE_URL + "bookTicket", { ticketId });
  }



}
