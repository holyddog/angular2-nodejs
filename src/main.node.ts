import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UniversalModule } from 'angular2-universal';

import { App, Home, Detail, Login } from './app/app';
import { FullLayout, SimpleLayout } from './app/app.layout';
import { AppService } from './app/app.service';

@NgModule({
  bootstrap: [ App ],
  declarations: [ App, Home, Detail, Login, FullLayout, SimpleLayout ],
  providers: [
    AppService
  ],
  imports: [
    UniversalModule,
    FormsModule,
    RouterModule.forRoot([
      {   
        path: '', 
        component: FullLayout,
        children: [
          { path: '', component: Home },
          { path: 'detail/:id', component: Detail }
        ] 
      },
      {   
        path: '', 
        component: SimpleLayout,
        children: [
          { path: 'login', component: Login }
        ] 
      },
    ])
  ]
})
export class MainModule {

}
