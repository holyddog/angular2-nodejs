import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UniversalModule } from 'angular2-universal';

import { App, Home, Detail } from './app/app';
import { AppService } from './app/app.service';

@NgModule({
  bootstrap: [ App ],
  declarations: [ App, Home, Detail ],
  providers: [
    AppService
  ],
  imports: [
    UniversalModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: Home, pathMatch: 'full' },
      { path: 'detail/:id', component: Detail }
    ])
  ]
})
export class MainModule {

}
