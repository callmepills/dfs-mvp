import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { DKPlayer } from './dkplayer';
import { Player } from './player';
import { Ranking } from './ranking';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-football',
  templateUrl: './football.component.html',
  styleUrls: ['./football.component.css']
})
export class FootballComponent implements OnInit {

  EXPERTS = ['overall', 'bowen', 'clay', 'cockroft', 'dopp', 'karabell', 'loza', 'moody', 'yates'];
  SEASONS = [2017, 2018, 2019, 2020, 2021, 2022];
  WEEKS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
  POSITIONS = ['QB', 'RB', 'WR', 'TE', 'DST'];

  season = 2022;
  week = 1;
  position = 'QB';
  expert = 'clay';
  draftGroupId: number;

  dkPlayers: DKPlayer[];
  rankings: Ranking[];
  players: Player[];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getRankings().subscribe();
  }

  getRankings() {
    return this.http.get<Ranking[]>(`/espn-rankings/football/${this.season}/${this.week}/${this.position.toLowerCase()}`)
      .pipe(tap(rankings => this.rankings = rankings));
  }

  getDKPlayers() {
    return this.http.get<{ playerList: DKPlayer[] }>(`/draftkings/lineup/getavailableplayers?contestTypeId=21&draftGroupId=${this.draftGroupId}`)
      .pipe(tap(response => this.dkPlayers = response.playerList));
  }

  onRankingsChange(form: NgForm) {
    delete this.players;
    this.getRankings().subscribe(() => form.valid && this.loadPlayers());
  }

  onDKPlayersChange(form: NgForm) {
    delete this.players;
    if (form.invalid) { return; }
    this.getDKPlayers().subscribe(() => this.loadPlayers());
  }

  loadPlayers() {
    this.players = [];

    const maxRank = Math.max(...this.rankings.map(ranking => +ranking[this.expert]));

    this.rankings.forEach(ranking => {
      const player = new Player();
      player.loadRanking(ranking, this.position, this.expert);
      if (!player.rank) { return; }

      const dkPlayer = this.dkPlayers.find(dkp => player.equals(dkp));
      if (!dkPlayer) { return; }
      player.loadDKPlayer(dkPlayer);

      player.value = player.salary / (maxRank + 1 - player.rank);

      this.players.push(player);
    });

    const mvpCount = this.determineMVPCount();
    this.players.sort((a, b) => a.value - b.value);
    for (let i = 0; i < mvpCount; i++) {
      this.players[i].mvp = true;
    }

    this.players.sort((a, b) => a.rank - b.rank);
  }

  determineMVPCount() {
    switch (this.position) {
      case 'WR':
        return 9;
      case 'RB':
        return 6;
      case 'QB':
      case 'TE':
      case 'DST':
      default:
        return 3;
    }
  }
}
