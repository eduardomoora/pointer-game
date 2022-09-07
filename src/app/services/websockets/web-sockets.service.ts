import {Injectable} from '@angular/core';
import {Socket} from "ngx-socket-io";
import {User} from "../../dashboard/dashboard.component";
import {Router} from "@angular/router";
import {BehaviorSubject, Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WebSocketsService {
  private _user!: User;
  private  users: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  public readonly users$: Observable<User[]>  = this.users.asObservable();
  private  showCards: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public readonly showCards$: Observable<boolean>  = this.showCards.asObservable();

  constructor(private socket: Socket,
              private route: Router) {
              this.reloadStorage();
              this.listeners();
  }

  get user() {
    return this._user;
  }

  public initSocket() {
    this.socket.connect()
  }

  listenEvent(event: string): any {
    return this.socket.fromEvent(event);
  }
  ;

  emitEvent(event: string, data: any) {
    this.socket.emit(event, {...data}, (res: any) => {


    });
  }

  loginUser(data: string) {
    this.socket.emit('userConnected', {name: data}, (res: any) => {
      this._user = res.data.user
      console.log('login',res.data.user)
      this.loadLocalStorage(res.data.user);
      this.route.navigate(['dashboard', 'room', 123456789]);
    })
  }

  loadLocalStorage(user: User): void {
    console.log('loadStorage')
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  reloadStorage(): void {
    console.log('reload called')
    const userStorage = localStorage.getItem('currentUser');

    if (!userStorage) {
      return
    }
    console.log('usestorage',userStorage)
    const user = JSON.parse(userStorage);
    this.loginUser(user.name)
  }

  listeners() {
    this.socket.fromEvent<User[]>('users').pipe(
      tap((data: User[]) => this.users.next(data))
    ).subscribe();

    this.socket.fromEvent<boolean>('showCards').pipe(
      tap((data: boolean) => this.showCards.next(data)),
      tap((data) => console.log(data,'newe one'))
    ).subscribe();
  }


  logout(): void {
     this.socket.emit('userLogout', this._user.socketId,()=>{
       this.route.navigate(['']);
     })
  }

   point(card: number | null): void {
    this.socket.emit('point',  card)
  }


  reset(): void {
    this.socket.emit('reset')
  }

  showCardsEvent(): void {
    this.socket.emit('showCards')
  }
}
