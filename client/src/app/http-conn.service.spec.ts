import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { isObservable } from "rxjs";

import { HttpConnService } from './http-conn.service';

describe('HttpConnService', () => {
  let service: HttpConnService
  let httpMock: HttpTestingController

  /**  http server function */
  const giveResponseForMethod = (relUrl, expectedMethod) => {
    let server = httpMock.expectOne(`${service.BASE_URL + relUrl}`)
    expect(server.request.method).toBe(expectedMethod)
    server.flush({})
  }

  const giveResponseForBody = (relUrl, body) => {
    let server = httpMock.expectOne(`${service.BASE_URL + relUrl}`)
    expect(server.request.body).toEqual(body)
    server.flush({})
  }

  /** presetup */

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpConnService]
    });
  });

  beforeEach(() => {
    service = TestBed.get(HttpConnService)
    httpMock = TestBed.get(HttpTestingController)
  })

  afterEach(() => {
    httpMock.verify()
  })


  /** test cases */

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /**test cases for getUnavalaibleSeats */

  it('getUnavailableSeats should make get request', () => {
    let testDate = new Date()
    service.getUnavailableSeats(testDate).subscribe()
    giveResponseForMethod(`getUnavailableSeats/${testDate.toString()}`, 'GET')
  })

  it('getUnavailableSeats should return observable', () => {
    let test = service.getUnavailableSeats(new Date())
    expect(isObservable(test)).toBe(true)
  })

  /**test cases for lockSeats */

  it('lockSeat should make POST request', () => {
    service.lockSeat({}).subscribe()
    giveResponseForMethod(`lockSeat`, 'POST')
  })

  it('lock seats should have body containing seats data', () => {
    let seat = { seats: "1234" }
    service.lockSeat(seat).subscribe()
    giveResponseForBody('lockSeat', seat)
  })

  it('lockSeat should return observable', () => {
    let test = service.lockSeat(new Date())
    expect(isObservable(test)).toBe(true)
  })

  /** test cases for book seats */
  it('bookSeat should make POST request', () => {
    service.bookSeat({}).subscribe()
    giveResponseForMethod(`bookTicket`, 'POST')
  })

  it('bookSeats should have body containing ticket id', () => {
    let ticketId = 1234
    service.bookSeat(ticketId).subscribe()
    giveResponseForBody('bookTicket', { ticketId })
  })

  it('bookSeat should return observable', () => {
    let test = service.bookSeat(new Date())
    expect(isObservable(test)).toBe(true)
  })

});
