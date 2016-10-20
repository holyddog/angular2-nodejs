import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { AuthService } from './auth.service';
import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app',
  template: `
    <router-outlet></router-outlet>
  `
})
export class App {
}

@Component({
  template: `
    <h3>Mammals List</h3>
    <div *ngIf="mammals == null">Loading...</div>
    <ul class="menu" *ngIf="mammals">
      <li *ngFor="let m of mammals" (click)="showDetail(m.id)" class="item"> 
        <span>{{m.name}}</span>
      </li>
    </ul>
    <button (click)="gotoAdmin()">Admin</button>
    <button (click)="gotoLogIn()" *ngIf="!authService.isLoggedIn">Log In</button>
    <button (click)="authService.logout()" *ngIf="authService.isLoggedIn">Log Out</button>
  `,
  styles: [`
    .menu {
      list-style: none;
      padding: 0;
    }
    .item {
      cursor: pointer;
      margin: 0;
      background-color: #eee;
      padding: 10px;
      margin-bottom: 15px;
    }
  `]
})
export class Home implements OnInit {
  mammals: Object[];

  constructor(
    private router: Router, 
    private appService: AppService, 
    private authService: AuthService) { }

  ngOnInit(): void {
    this.appService.getMammals().then(
      mammals => {
        this.mammals = mammals;
      }
    );
  }

  gotoAdmin(): void {
    this.router.navigate(['/admin']);
  }

  gotoLogIn(): void {
    let navigationExtras: NavigationExtras = {
			queryParams: { 'continue': this.router.url }
		};
		this.router.navigate(['/login'], navigationExtras);
  }

  showDetail(id: number): void {
    this.router.navigate(['/detail', id]);
  }
}

@Component({
  template: `
    <div *ngIf="mammal == null">Loading...</div>
    <div *ngIf="mammal">
      <h3>{{mammal.name}}</h3>
      <div>
        <img src="{{mammal.pic}}">
      </div>
    </div>
  `,
  styles: [`
    img {
      max-width: 100%;
    }
  `]
})
export class Detail implements OnInit {
  mammal: Object;

  constructor(private route: ActivatedRoute, private appService: AppService) { }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      var id = +params['id'];
      this.appService.getMammal(id).then(
        mammal => {
          this.mammal = mammal;
        }
      );
    });
  }
}

@Component({
  template: `
    <h3>Admin</h3>
    <div>Login status = true</div>
  `
})

export class Admin {
}

@Component({
  template: `
    <button (click)="logIn()">Log In</button>
  `
})

export class Login {
  constructor(public authService: AuthService, public router: Router) {
    if (authService.isLoggedIn) {
      this.router.navigate(['/']);
    }
  }

  goHome(): void {
    this.router.navigate(['/']);
  }

  logIn(): void {
    this.authService.login().subscribe(() => {
      if (this.authService.isLoggedIn) {
        let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/';

        let redirectUrl = this.router.parseUrl(this.router.url).queryParams['continue'];
        if (redirectUrl != null) {
          let navigationExtras: NavigationExtras = this.router.parseUrl(redirectUrl);
          this.router.navigate([redirectUrl.split('?')[0]], navigationExtras);
        }
        else {
          this.router.navigate([redirect]);
        }
      }
    });
  }
}