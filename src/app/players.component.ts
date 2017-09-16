import { Component, Input, OnInit } from '@angular/core';

import { Player } from './player';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {
  @Input() players: Player[];

  constructor() { }

  ngOnInit() {
  }

}
