import { DKPlayer } from './dkplayer';
import { Ranking } from './ranking';

export class Player {
  public position: string;
  public name: string;
  public team: string;
  public awayTeam: string;
  public homeTeam: string;
  public opp: string;
  public fppg: number;
  public oprk: number;
  public salary: number;
  public rank: number;
  public mvp = false;

  loadRanking(ranking: Ranking, position: string, expert: string) {
    this.position = position;
    this.name = ranking.name;
    this.team = position === 'DST' ? ranking.name.toUpperCase() : ranking.team;
    this.opp = ranking.opp;
    this.rank = +ranking[expert];
  }

  loadDKPlayer(dkPlayer: DKPlayer) {
    this.awayTeam = dkPlayer.atabbr;
    this.homeTeam = dkPlayer.htabbr;
    this.fppg = +dkPlayer.ppg;
    this.oprk = dkPlayer.or;
    this.salary = dkPlayer.s;
  }

  get value(): number {
    let maxRank: number;
    switch (this.position) {
      case 'DST':
        maxRank = 20;
        break;
      case 'QB':
      case 'TE':
        maxRank = 25;
        break;
      case 'RB':
      case 'WR':
      default:
        maxRank = 50;
    }
    return this.salary / (maxRank + 1 - this.rank);
  }

  equals(dkPlayer: DKPlayer) {
    const team = dkPlayer.tid === dkPlayer.atid ? dkPlayer.atabbr : dkPlayer.htabbr;
    if (this.position === 'DST') {
      return this.team === team;
    } else {
      const name = `${dkPlayer.fn} ${dkPlayer.ln}`.trim();
      return this.name === name && this.team === team;
    }
  }
}
