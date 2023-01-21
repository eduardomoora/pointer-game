import {Component, OnInit, ViewChild} from '@angular/core';
import {WebSocketsService} from "../services/websockets/web-sockets.service";
import {Observable, tap} from "rxjs";
import { ChartComponent } from "ng-apexcharts";
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";
import { sizesMap } from '../shared/pipe/sizes.model';

export interface User {
  name: string;
  points: number;
  socketId: string;
  room: string;

}


/*export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};*/

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
  public labels: string[] = [];
  public series: number[]= [];
  public displayedColumns: string[] = [ 'name','points'];
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions!: Partial<any>;
  public selected!: number | null;

  constructor(private websocket: WebSocketsService) {
    this.user = this.websocket.user;
    this.users$ = this.websocket.users$.pipe(
      tap((users) => {
        const userData = users.filter(user => user.points !== null).map(m => m.points.toString());
        const reset = users.every((user)=> user.points === null);
        if(reset){
          this.selected = null;
        }
        const {series, labels} = this.generateChartData(userData);
        this.series = series;
        this.labels = labels.map((item: string) => sizesMap.get(+item));
      })
    );
  }

  ngOnInit(): void {
  this.showCards$ = this.websocket.showCards$.pipe(
    tap(_ => {
      this.chartOptions = {
        series: this.series,
        chart: {
          type: "donut",
          width: 380,
        },
        labels: this.labels,
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 150
              },
              legend: {
                position: "bottom"
              }
            }
          }
        ]
      };
    })
  );
  }

  reset(): void{
    this.selected = null;
    this.websocket.reset()
  }

  logout(){
    this.websocket.logout();
  }

  onPoint(card: number) {
    this.selected = card;
    this.websocket.point(card);
  }

  onShowCards() {
    this.websocket.showCardsEvent();
  }

  generateChartData(array: any[]): any{
    const counts = array.reduce((acc, value) => ({
      ...acc,
      [value]: (acc[value] || 0) + 1
    }), {});
    const series = Object.values(counts)
    const labels = Object.keys(counts);

  return {series,labels};


  }


}
