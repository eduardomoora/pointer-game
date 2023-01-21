

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from "../material/material.module";
import { SizesPipe } from './pipe/sizes.pipe';



@NgModule({
  declarations: [
    SizesPipe
  ],
  imports: [
    MaterialModule
  ],
  exports: [MaterialModule, SizesPipe]
})
export class SharedModule { }
