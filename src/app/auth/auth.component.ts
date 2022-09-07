import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {WebSocketsService} from "../services/websockets/web-sockets.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  public nameControl: FormControl<string>;

  constructor(private route: Router,
              private websocket: WebSocketsService,
              private fb: FormBuilder
              ) {
    this.nameControl = new FormControl('', {nonNullable: true});
  }

  ngOnInit(): void {
  }

  async onLogin() {
    if (this.nameControl.valid) {
      this.websocket.loginUser( this.nameControl.value);

    }
  }
}
