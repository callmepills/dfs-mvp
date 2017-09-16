import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Player } from './player';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  quarterBacks: Player[];
  runningBacks: Player[];
  wideReceivers: Player[];
  tightEnds: Player[];
  defenses: Player[];

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.quarterBacks = [];
    this.runningBacks = [];
    this.wideReceivers = [];
    this.tightEnds = [];
    this.defenses = [];

    this.http.get('/lineup/getavailableplayers?contestTypeId=21&draftGroupId=15221')
      .subscribe(data => {
        data['playerList'].forEach((player) => {
          switch (player.pn) {
            case 'QB': this.quarterBacks.push(player); break;
            case 'RB': this.runningBacks.push(player); break;
            case 'WR': this.wideReceivers.push(player); break;
            case 'TE': this.tightEnds.push(player); break;
            case 'DST': this.defenses.push(player); break;
          }
        });
      });
  }
}
