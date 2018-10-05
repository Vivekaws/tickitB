import { Component, OnInit } from '@angular/core';
import { TicketStoringService } from '../ticket-storing.service';
import { paths } from '../Strings/Strings';
import {  Router} from '@angular/router';
@Component({
  selector: 'app-failure',
  templateUrl: './failure.component.html',
  styleUrls: ['./failure.component.css']
})
export class FailureComponent implements OnInit {

  constructor(private tss:TicketStoringService, private router:Router) { }

  ngOnInit() {
    if(this.tss.getTicket().status!=paths.failStatus){
      this.router.navigate([paths.seatPath,{noOfSeats:1}]);
    }
    this.tss.resetTicket();
  }

}
