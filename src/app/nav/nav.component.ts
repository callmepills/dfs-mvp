import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  footballWeeks: number[];

  constructor() {
  }

  ngOnInit() {
    this.footballWeeks = Array(17).fill(0).map((x, i) => ++i);
  }
}
