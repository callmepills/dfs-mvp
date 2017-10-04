import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FootballRankingsComponent } from './football-rankings.component';

describe('FootballRankingsComponent', () => {
  let component: FootballRankingsComponent;
  let fixture: ComponentFixture<FootballRankingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FootballRankingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FootballRankingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
