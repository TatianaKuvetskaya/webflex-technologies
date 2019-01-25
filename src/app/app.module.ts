import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {StoreModule} from '@ngrx/store';
import { templateReducer } from './store/reducers/template.reducer';

import { AppComponent } from './app.component';
import {HomeComponent} from './home/home.component';
import {routes} from './router.const';
import {RouterModule, Routes} from '@angular/router';
import {NotFoundComponent} from './not-found/not-found.component';
import {EffectsModule} from '@ngrx/effects';
import {TemplateEffects} from './store/effects/template.effects';
import {HomeService} from './home/home.service';

const appRoutes: Routes = [
  {path: routes.home, component: HomeComponent},
  {path: routes.name, component: HomeComponent},
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({'templateData': templateReducer}),
    RouterModule.forRoot(appRoutes),
    EffectsModule.forRoot([TemplateEffects])
  ],
  providers: [
    HomeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
