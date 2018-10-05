import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { TicketStoringService } from '../ticket-storing.service';
import { paths } from '../Strings/Strings';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {
  public ticket;
  public rowLetter=paths.rowLetter;
  constructor(private tss:TicketStoringService,private route:ActivatedRoute, public router:Router){}
  ngOnInit() {
    this.ticket=this.tss.getTicket();
    if(this.ticket.ticketID==""){
      this.router.navigate([paths.seatPath,{noOfSeats:1}]);
    }
    
  }
  
  ngOnDestroy(): void {
    this.tss.resetTicket();
  }
  
}
