import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class TicketStoringService {

  private ticket={
    ticketID:null,
    seats:null,
    name:null,
    email:null,
    status:null
  };

  resetTicket(){
    this.ticket.ticketID=null;
    this.ticket.seats=null;
    this.ticket.name=null;
    this.ticket.email=null;
    this.ticket.status=null;
  }
  
  setStatus(status){
    this.ticket.status=status;
  }
  
  setTicket(ticket){
    this.ticket.ticketID=ticket._id;
    this.ticket.seats=ticket.seats;
    this.ticket.name=ticket.ownerInfo.name;
    this.ticket.email=ticket.ownerInfo.id;
  }
  
  getTicket(){
    return this.ticket;
  }
  constructor() { }
}
