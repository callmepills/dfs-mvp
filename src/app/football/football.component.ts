import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { DKPlayer } from './dkplayer';
import { Player } from './player';
import { Ranking } from './ranking';

@Component({
  selector: 'app-football',
  templateUrl: './football.component.html',
  styleUrls: ['./football.component.css']
})
export class FootballComponent implements OnInit {

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

  constructor(private http: HttpClient, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap
      .subscribe((params: ParamMap) => {

        this.quarterbacks = [];
        this.runningBacks = [];
        this.wideReceivers = [];
        this.tightEnds = [];
        this.defenses = [];

        const season = params.get('season');
        const week = params.get('week');

        Observable.forkJoin(
          this.http.get(`/rankings/espn/football/${season}/${week}/qb`),
          this.http.get(`/rankings/espn/football/${season}/${week}/rb`),
          this.http.get(`/rankings/espn/football/${season}/${week}/wr`),
          this.http.get(`/rankings/espn/football/${season}/${week}/te`),
          this.http.get(`/rankings/espn/football/${season}/${week}/dst`),
          this.http.get('/lineup/getavailableplayers?contestTypeId=21&draftGroupId=15875')
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
            player.team = (dkPlayer.tid === dkPlayer.atid) ? dkPlayer.atabbr : dkPlayer.htabbr;
            player.awayTeam = dkPlayer.atabbr;
            player.homeTeam = dkPlayer.htabbr;
            player.fppg = +dkPlayer.ppg;
            player.oprk = dkPlayer.or;
            player.salary = dkPlayer.s;
            const ranking: Ranking = this.findRanking(player);
            if (ranking && ranking.berry !== 'NR') {
              player.rank = +ranking.berry;
              this.addPlayer(player);
            }
          });

          this.calculateValues(this.quarterbacks, 3);
          this.calculateValues(this.runningBacks, 6);
          this.calculateValues(this.wideReceivers, 9);
          this.calculateValues(this.tightEnds, 3);
          this.calculateValues(this.defenses, 3);

          this.quarterbacks.sort(this.compareRank);
          this.runningBacks.sort(this.compareRank);
          this.wideReceivers.sort(this.compareRank);
          this.tightEnds.sort(this.compareRank);
          this.defenses.sort(this.compareRank);
        });
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

    return rankings.find((ranking) => ranking.name === player.name);
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

  calculateValues(players: Player[], mvpCount: number): void {
    const maxRanking: number = Math.max(...players.map((player: Player) => player.rank));
    players.forEach((player: Player) => {
      player.value = player.salary / (maxRanking + 1 - player.rank);
    });

    players.sort((a: Player, b: Player): number => a.value - b.value);
    for (let i = 0; i < mvpCount; i++) {
      players[i].mvp = true;
    }
  }

  compareRank(playerA: Player, playerB: Player): number {
    return playerA.rank - playerB.rank;
  }
}
