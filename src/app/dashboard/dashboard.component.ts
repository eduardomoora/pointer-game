import { Component, OnInit } from '@angular/core';
import {WebSocketsService} from "../services/websockets/web-sockets.service";
import { Observable } from "rxjs";

export interface User {
  name: string;
  points: number;
  socketId: string;
  room: string;

}


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public showCards$!: Observable<boolean>;
  public user!: User;
  public listPoints: number[] = [1,2,3,5,8,10]
  public users$!: Observable<User[]>;
  displayedColumns: string[] = [ 'name','points'];
  constructor(private websocket: WebSocketsService) {
    this.user = this.websocket.user;
    this.users$ = this.websocket.users$;
  }

  ngOnInit(): void {
  this.showCards$ = this.websocket.showCards$;
  }

  reset(): void{
    this.websocket.reset()
  }

  logout(){
    this.websocket.logout();
  }

  onPoint(card: number) {
    this.websocket.point(card);
  }

  onShowCards() {
    this.websocket.showCardsEvent();
  }
}
