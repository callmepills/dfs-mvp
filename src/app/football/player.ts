export class Player {
  awayTeam: string;
  homeTeam: string;
  opp: string;
  fppg: number;
  oprk: number;
  salary: number;
  rank: number;
  value: number;
  mvp: boolean;

  constructor(public position: string,
              public name: string,
              public team?: string) {

  }
}
