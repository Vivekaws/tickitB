import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { paths } from '../Strings/Strings';

@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.css']
})
export class FirstPageComponent implements OnInit {

  constructor(private router:Router) { }

  seats(noOfSeats){
    this.router.navigate([paths.seatPath,{noOfSeats:noOfSeats}]);
  }
  ngOnInit() {
  }

}
