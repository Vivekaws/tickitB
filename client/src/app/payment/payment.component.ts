import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { paths } from '../Strings/Strings';
import { HttpConnService } from '../http-conn.service';
import { TicketStoringService } from '../ticket-storing.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  rightAnswer(){
    this.http.bookSeat(this.ticketId).subscribe(
      data=>{
        this.tss.setStatus(paths.successStatus);
        this.router.navigate([paths.successPath]);
      },
      error=>{
        this.tss.setStatus(paths.failStatus);
        //this.tss.resetTicket();
        //alert("Cannot Book!!!"+error.error.error);
        console.log(error);
        this.router.navigate([paths.failurePath]);
      }
    );
  }

  wrongAnswer(){
    this.tss.setStatus(paths.failStatus);
      //this.tss.resetTicket();
      this.router.navigate([paths.failurePath]);
  }

  public answer;
  public ticketId="";
  public signArray=['-','+'];
  public sign=this.signArray[Math.floor(Math.random()*2)];
  maxNumber=Math.ceil(Math.random()*20);
  minNumber=Math.ceil(Math.random()*2);
  constructor(private tss:TicketStoringService,private http:HttpConnService, private route:ActivatedRoute, private router:Router) { }
  check(){
   

  

    switch(this.sign){
      case '-':if(this.answer==this.maxNumber-this.minNumber){
        this.rightAnswer();
      }else{
        this.wrongAnswer();
      }
      break;
      case '+':
      if(this.answer==this.maxNumber+this.minNumber){
        this.rightAnswer();
      }else{
        this.wrongAnswer();
      }
      break;
    }
  }

  ngOnInit() {
    this.ticketId=this.tss.getTicket().ticketID;
    if(this.ticketId==""){
      this.router.navigate([paths.seatPath]);
    }
  }

}
