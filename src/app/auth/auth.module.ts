import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import {RouterModule} from "@angular/router";
import {AuthRoutingModule} from "./auth-routing.module";

import {MaterialModule} from "../material/material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule,

    RouterModule,
    MaterialModule
  ],
  exports: [AuthRoutingModule,AuthComponent]
})
export class AuthModule { }
