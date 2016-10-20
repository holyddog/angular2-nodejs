import { NgModule, Component }     from '@angular/core';
import { RouterModule } from '@angular/router';

import { App, Home, Detail, Admin, Login } from './app';
import { FullLayout, SimpleLayout } from './app.layout';

import { AuthGuard } from './auth-guard.service';
import { AuthService } from './auth.service';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {   
        path: '', 
        component: FullLayout,
        children: [
          { path: '', component: Home },
          { path: 'detail/:id', component: Detail },
          {
            path: 'admin',
            component: Admin,
            canActivate: [AuthGuard]
          }
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
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthGuard, AuthService
  ]
})
export class AppRouting { }