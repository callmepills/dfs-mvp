import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  playerList: Object[];

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.http.get('/lineup/getavailableplayers?contestTypeId=21&draftGroupId=15221')
      .subscribe(data => {
        this.playerList = data['playerList'];
      });
  }
}
