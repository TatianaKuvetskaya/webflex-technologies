import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {NotFoundComponent} from './not-found.component';

@NgModule({
  declarations: [
    NotFoundComponent
  ],
  imports: [
    BrowserModule
  ],
  exports: [
    NotFoundComponent
  ]
})
export class NotFoundModule { }
