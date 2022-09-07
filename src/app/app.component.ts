import { Component } from '@angular/core';
import { WebSocketsService } from './services/websockets/web-sockets.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pointer-game';
  constructor(websocket: WebSocketsService){
    websocket.initSocket();
  }
}
