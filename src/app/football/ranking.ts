export class Ranking {
  overall: number;
  opp: string;
  berry: string;
  karabell: string;
  yates: string;
  cockroft: string;
  avg: number;

  constructor(public name: string,
              public team?: string) {

  }
}
