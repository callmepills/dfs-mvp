import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { PlayersComponent } from './players.component';
import { NthPipe } from './nth.pipe';
import { NavComponent } from './nav.component';
import { FootballComponent } from './football.component';

const appRoutes: Routes = [
  { path: '', component: AppComponent },
  { path: 'football', component: FootballComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    PlayersComponent,
    NthPipe,
    NavComponent,
    FootballComponent
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
