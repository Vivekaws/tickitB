import { TestBed, inject } from '@angular/core/testing';

import { TicketStoringService } from './ticket-storing.service';

describe('TicketStoringService', () => {
  let service: TicketStoringService
  let ticket: any
  let newTicket: any

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TicketStoringService]
    });
  });

  beforeEach(() => {
    service = new TicketStoringService()
  })

  beforeEach(() => {
    ticket = {
      _id: "375630239045",
      seats: [1, 2, 3, 4],
      ownerInfo: {
        name: "Test user",
        id: "testuser@testmail.com"
      },
    }

    newTicket = {
      ticketID: "375630239045",
      seats: [1, 2, 3, 4],
      name: "Test user",
      email: "testuser@testmail.com",
      status: null
    };
  })

  /** test cases */

  it('Ticket booking service should be created', () => {
    expect(service).toBeTruthy();
  });

  it('setTicket should set the ticket', () => {
    service.setTicket(ticket)
    let testTicket = service.getTicket()
    let { ticketID: setId, seats: setSeats, name: setName, email: setEmail } = testTicket
    let { _id: expectedId, seats: expectedSeats, ownerInfo: { name: expectedName, id: expectedEmail }} = ticket

    expect(setId).toBe(expectedId)
    expect(setSeats).toBe(expectedSeats)
    expect(setName).toBe(expectedName)
    expect(setEmail).toBe(expectedEmail)
  })

  it('setStatus should set the status locked', () => {
    service.setStatus("locked")
    let testTicket = service.getTicket()
    expect(testTicket.status).toBe("locked")
  })

  it('setStatus should set the status available', () => {
    service.setStatus("available")
    let testTicket = service.getTicket()
    expect(testTicket.status).toBe("available")
  })

  it('setStatus should set the status unavailable', () => {
    service.setStatus("unavailable")
    let testTicket = service.getTicket()
    expect(testTicket.status).toBe("unavailable")
  })

  it('resetTicket should reset the all fields of ticket as null', ()=>{
    service.setTicket(ticket)
    service.resetTicket()
    let testTicket = service.getTicket()
    let { ticketID, seats, name, email, status } = testTicket

    expect(ticketID).toBeFalsy()
    expect(seats).toBeFalsy()
    expect(name).toBeFalsy()
    expect(email).toBeFalsy()
    expect(status).toBeFalsy()

  })
});
