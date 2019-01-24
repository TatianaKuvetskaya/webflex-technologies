import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HomeComponent} from './home.component';
import {NotFoundModule} from '../not-found/not-found.module';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    BrowserModule,
    NotFoundModule,
    RouterModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
