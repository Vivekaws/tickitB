import { Component, OnInit } from '@angular/core';
import { seatClass } from './seat';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { HttpConnService } from '../http-conn.service';
import { paths } from '../Strings/Strings';
import { TicketStoringService } from "../ticket-storing.service";

@Component({
  selector: 'app-seats',
  templateUrl: './seats.component.html',
  styleUrls: ['./seats.component.css']
})
export class SeatsComponent implements OnInit {

  public todayDate;
  public todayDateString;
  public date;
  public rate = paths.prize;
  public isSelected = false;
  public name = "";
  public email = "";
  public rowLetter = paths.rowLetter;
  public seats = [[], [], [], []];
  public selectedSeats = [];
  public maxSeats = 2;

  
  constructor(private tss: TicketStoringService, private router: Router, private route: ActivatedRoute, private http: HttpConnService) {
    for (let index = 0; index < this.seats.length; index++) {
      this.initSeats(this.seats[index], index);
    }
  }

  ngOnInit() {
    this.todayDate = new Date()
    var year = this.todayDate.getFullYear();
    var month = this.todayDate.getMonth() + 1;
    var dt = this.todayDate.getDate();

    if (dt < 10) {
      dt = '0' + dt;
    }
    if (month < 10) {
      month = '0' + month;
    }
    this.todayDateString = this.date = year + '-' + month + '-' + dt;
    this.route.paramMap.subscribe((param: ParamMap) => this.maxSeats = parseInt(param.get('noOfSeats')));
    this.http.getUnavailableSeats(this.date)
      .subscribe(data => data["data"].forEach(element => {
        this.seats[element.row][element.number].classes["no-available"] = true;
      }));
    if (!this.maxSeats)
      this.maxSeats = 1;
  }
  
  initSeats(arr, row) {
    for (let i = 0; i < 25; i++) {
      arr.push(new seatClass(row, i, "seat"));
    }
  }

  chengedVal() {
    this.selectedSeats.forEach(element => {
      element.classes.selected = false;
    });
    this.selectedSeats = [];
  }

  resetSeats() {
    this.seats.forEach(element => {
      element.forEach(ele => {
        ele.classes.selected = false;
        ele.classes["no-available"] = false;
      });
    });
  }

  getindex(seat) {
    var row, num;
    for (let index = 0; index < this.seats.length; index++) {
      const element = this.seats[index];
      num = element.indexOf(seat)
      if (num != -1) {
        row = index;
        break;
      }
    }
    return { row: row, num: num };
  }

  removeSeat(index) {
    this.selectedSeats[index].classes.selected = false;
    this.selectedSeats.splice(index, 1);
    if (this.selectedSeats.length < 1) {
      this.isSelected = false;
    }
  }

  addToSelected(seat) {
    this.isSelected = false;
    seat.classes.selected = true;
    this.selectedSeats.push(seat);
  }

  addSeat(seat) {
    if (this.selectedSeats.length < this.maxSeats) {
      this.addToSelected(seat);
    }
    else {
      this.removeSeat(0);
      this.addToSelected(seat);
    }
  }

  selectSeat(seat) {
    var i = 0;
    var s = seat;
    var seatIndex = this.getindex(seat);
    var row = seatIndex.row;
    var num = seatIndex.num;
    if (this.selectedSeats.indexOf(s) != -1) {
      var ind = this.selectedSeats.indexOf(s);
      this.removeSeat(ind);
    } else {
      while (i <= this.maxSeats - 1 && num + i < 25) {
        if (this.seats[row][num + i].classes["no-available"] || ((num + i) % 10 == 5 && i != 0))
          break;
        this.addSeat(this.seats[row][num + i]);
        i++;
      }
    }
  }

  lockSeats() {
    if (this.selectedSeats.length == this.maxSeats) {
      var seats = [];
      this.selectedSeats.forEach(element => {
        seats.push({ row: element.row, number: element.number });
      });
      var ticket = {
        seats: seats,
        name: this.name,
        id: this.email,
        date: this.date
      }
      console.log(ticket);
      this.http.lockSeat(ticket).subscribe(
        data => {
          console.log(data);
          this.tss.setTicket(data);
          this.tss.setStatus(paths.lockedStatus);
          this.router.navigate([paths.paymentPath]);
        },
        error => {
          alert("Cannot Book!!!" + error.error.error);

        });
    }
    else {
      this.isSelected = true;
    }
  }
  
  changeDate() {
    this.chengedVal();
    this.resetSeats();
    //console.log(this.date);
    this.http.getUnavailableSeats(this.date).subscribe(data => data["data"].forEach(element => {
      this.seats[element.row][element.number].classes["no-available"] = true;
    }));
  }

  seatHovered(seat) {

    var i = 0;
    var seatIndex = this.getindex(seat)
    var row = seatIndex.row, num = seatIndex.num;
    while (i <= this.maxSeats - 1 && num + i < 25) {
      if (this.seats[row][num + i].classes["no-available"] || ((num + i) % 10 == 5 && i != 0))
        break;
      this.seats[row][num + i].classes.selected = true;
      i++;
    }
  }

  seatUnhovered(seat) {
    var i = 0;
    var seatIndex = this.getindex(seat)
    var row = seatIndex.row, num = seatIndex.num;
    while (i <= this.maxSeats - 1 && num + i < 25) {
      if (this.selectedSeats.indexOf(this.seats[row][num + i]) == -1)
        if (this.seats[row][num + i].classes.selected)
          this.seats[row][num + i].classes.selected = false;
        else
          break;

      i++;
    }
  }

}
