import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PlayersComponent } from './players.component';
import { NthPipe } from './nth.pipe';

@NgModule({
  declarations: [
    AppComponent,
    PlayersComponent,
    NthPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
