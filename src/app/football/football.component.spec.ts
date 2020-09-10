import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { FootballComponent } from './football.component';
import { Player } from './player';
import { NthPipe } from '../nth.pipe';
import { Ranking } from './ranking';

describe('FootballComponent', () => {
  let component: FootballComponent;
  let fixture: ComponentFixture<FootballComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FootballComponent, NthPipe ],
      imports: [ RouterTestingModule, HttpClientTestingModule ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FootballComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates component', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit()', () => {
    // TODO
  });

  describe('findRanking()', () => {

    it('returns qb if position is qb', () => {
      const ranking = new Ranking('Joe Flacco', 'BAL');
      component.qbRankings = [ ranking ];
      const result = component.findRanking(new Player('QB', 'Joe Flacco', 'BAL'));
      expect(result).toBe(ranking);
    });

    it('returns rb if position is rb', () => {
      const ranking = new Ranking('Jamal Lewis', 'BAL');
      component.rbRankings = [ ranking ];
      const result = component.findRanking(new Player('RB', 'Jamal Lewis', 'BAL'));
      expect(result).toBe(ranking);
    });

    it('returns wr if position is wr', () => {
      const ranking = new Ranking('Derrick Mason', 'BAL');
      component.wrRankings = [ ranking ];
      const result = component.findRanking(new Player('WR', 'Derrick Mason', 'BAL'));
      expect(result).toBe(ranking);
    });

    it('returns te if position is te', () => {
      const ranking = new Ranking('Todd Heap', 'BAL');
      component.teRankings = [ ranking ];
      const result = component.findRanking(new Player('TE', 'Todd Heap', 'BAL'));
      expect(result).toBe(ranking);
    });

    it('returns dst if position is dst', () => {
      const ranking = new Ranking('Bal');
      component.dstRankings = [ ranking ];
      const result = component.findRanking(new Player('DST', 'Ravens', 'BAL'));
      expect(result).toBe(ranking);
    });
  });

  describe('addPlayer()', () => {

    it('adds qb if position is qb', () => {
      const player = new Player('QB', 'Joe Flacco', 'BAL');
      component.addPlayer(player);
      expect(component.quarterbacks).toContain(player);
    });

    it('adds rb if position is rb', () => {
      const player = new Player('RB', 'Jamal Lewis', 'BAL');
      component.addPlayer(player);
      expect(component.runningBacks).toContain(player);
    });

    it('adds wr if position is wr', () => {
      const player = new Player('WR', 'Derrick Mason', 'BAL');
      component.addPlayer(player);
      expect(component.wideReceivers).toContain(player);
    });

    it('adds te if position is te', () => {
      const player = new Player('TE', 'Todd Heap', 'BAL');
      component.addPlayer(player);
      expect(component.tightEnds).toContain(player);
    });

    it('adds dst if position is dst', () => {
      const player = new Player('DST', 'Baltimore');
      component.addPlayer(player);
      expect(component.defenses).toContain(player);
    });
  });

  describe('calculateValues()', () => {
    // TODO
  });

  describe('compareRank()', () => {

    it('compares players by rank', () => {
      const playerA = new Player('QB', 'Joe Flacco');
      const playerB = new Player('QB', 'Tom Brady');
      playerA.rank = 1;
      playerB.rank = 100;
      expect(component.compareRank(playerA, playerB)).toBe(-99);
    });
  });
});
