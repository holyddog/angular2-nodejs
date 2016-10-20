import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UniversalModule } from 'angular2-universal';

import { App, Home, Detail, Admin, Login } from './app/app';
import { FullLayout, SimpleLayout } from './app/app.layout';
import { AppRouting } from './app/app.routing';

import { AppService } from './app/app.service';

@NgModule({
  bootstrap: [ App ],
  declarations: [ App, Home, Detail, Login, Admin, FullLayout, SimpleLayout ],
  providers: [
    AppService
  ],
  imports: [
    UniversalModule,
    FormsModule,
    AppRouting
  ]
})
export class MainModule {

}
