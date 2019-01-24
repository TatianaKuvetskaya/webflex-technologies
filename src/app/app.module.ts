import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {StoreModule} from '@ngrx/store';
import { templateReducer } from './store/reducers/template.reducer';

import { AppComponent } from './app.component';
import {HomeComponent} from './home/home.component';
import {routes} from './router.const';
import {RouterModule, Routes} from '@angular/router';
import {HomeModule} from './home/home.module';

const appRoutes: Routes = [
  {path: routes.home, component: HomeComponent},
  {path: routes.name, component: HomeComponent},
  {path: '**', redirectTo: routes.home},
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({'templateData': templateReducer}),
    RouterModule.forRoot(appRoutes),
    HomeModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
