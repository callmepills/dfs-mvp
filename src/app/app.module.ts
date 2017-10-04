import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { FootballRankingsComponent } from './football/football-rankings.component';
import { NthPipe } from './nth.pipe';
import { NavComponent } from './nav.component';

const appRoutes: Routes = [
  { path: '', component: AppComponent },
  { path: 'football/:season/:week', component: FootballRankingsComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NthPipe,
    NavComponent,
    FootballRankingsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
