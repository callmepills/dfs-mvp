import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

import { DKPlayer } from './dkplayer';
import { Player } from './player';
import { Ranking } from './ranking';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  qbRankings: Ranking[];
  rbRankings: Ranking[];
  wrRankings: Ranking[];
  teRankings: Ranking[];
  dstRankings: Ranking[];

  quarterbacks: Player[];
  runningBacks: Player[];
  wideReceivers: Player[];
  tightEnds: Player[];
  defenses: Player[];

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.quarterbacks = [];
    this.runningBacks = [];
    this.wideReceivers = [];
    this.tightEnds = [];
    this.defenses = [];

    Observable.forkJoin(
      this.http.get('/rankings/espn/quarterbacks'),
      this.http.get('/rankings/espn/running-backs'),
      this.http.get('/rankings/espn/wide-receivers'),
      this.http.get('/rankings/espn/tight-ends'),
      this.http.get('/rankings/espn/defenses'),
      this.http.get('/lineup/getavailableplayers?contestTypeId=21&draftGroupId=15221')
    ).subscribe((response: Object) => {

      this.qbRankings = response[0] as Ranking[];
      this.rbRankings = response[1] as Ranking[];
      this.wrRankings = response[2] as Ranking[];
      this.teRankings = response[3] as Ranking[];
      this.dstRankings = response[4] as Ranking[];

      response[5]['playerList'].forEach((dkPlayer: DKPlayer) => {
        const player: Player = new Player();
        player.position = dkPlayer.pn;
        player.name = (dkPlayer.fn + ' ' + dkPlayer.ln).trim();
        player.opp = dkPlayer.atabbr + ' @ ' + dkPlayer.htabbr;
        player.fppg = dkPlayer.ppg;
        player.oprk = dkPlayer.or;
        player.salary = dkPlayer.s;
        const ranking: Ranking = this.findRanking(player);
        if (ranking && ranking.berry !== 'NR') {
          player.ranking = +ranking.berry;
          this.addPlayer(player);
        }
      });

      this.quarterbacks.sort(this.compareRanking);
      this.runningBacks.sort(this.compareRanking);
      this.wideReceivers.sort(this.compareRanking);
      this.tightEnds.sort(this.compareRanking);
      this.defenses.sort(this.compareRanking);
    });
  }

  findRanking(player: Player): Ranking {
    let rankings: Ranking[];

    switch (player.position) {
      case 'QB':
        rankings = this.qbRankings;
        break;
      case 'RB':
        rankings = this.rbRankings;
        break;
      case 'WR':
        rankings = this.wrRankings;
        break;
      case 'TE':
        rankings = this.teRankings;
        break;
      case 'DST':
        rankings = this.dstRankings;
        break;
    }

    return rankings.find((ranking) => {
      return ranking.name === player.name;
    });
  }

  addPlayer(player: Player): void {
    switch (player.position) {
      case 'QB':
        this.quarterbacks.push(player);
        break;
      case 'RB':
        this.runningBacks.push(player);
        break;
      case 'WR':
        this.wideReceivers.push(player);
        break;
      case 'TE':
        this.tightEnds.push(player);
        break;
      case 'DST':
        this.defenses.push(player);
        break;
    }
  }

  compareRanking(playerA: Player, playerB: Player): number {
    return playerA.ranking - playerB.ranking;
  }
}
