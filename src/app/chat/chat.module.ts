import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { WindowComponent } from './window/window.component';



@NgModule({
  declarations: [ WindowComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ChatModule { }
