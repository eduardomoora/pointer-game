import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardRoutingModule} from "./dashboard-routing.module";
import { DashboardComponent } from './dashboard.component';
import {MaterialModule} from "../material/material.module";
import {NgApexchartsModule} from "ng-apexcharts";
import { SharedModule } from '../shared/shared.module';




@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    NgApexchartsModule,
  ],
  exports: [DashboardRoutingModule]
})
export class DashboardModule { }
