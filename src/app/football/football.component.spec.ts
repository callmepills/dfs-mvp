import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { FootballComponent } from './football.component';
import { NthPipe } from '../nth.pipe';

describe('FootballComponent', () => {
  let component: FootballComponent;
  let fixture: ComponentFixture<FootballComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FootballComponent, NthPipe ],
      imports: [ RouterTestingModule, HttpClientModule ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FootballComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
