import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

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
    <button (click)="gotoLogIn()">Log In</button>
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

  constructor(private router: Router, private appService: AppService) { }

  ngOnInit(): void {
    this.appService.getMammals().then(
      mammals => {
        this.mammals = mammals;
      }
    );
  }

  gotoAdmin(): void {

  }

  gotoLogIn(): void {
    this.router.navigate(['/login']);
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
    <button (click)="logIn()">Log In</button>
    <button (click)="logOut()">Log Out</button>
  `
})

export class Login {
  constructor(private router: Router) {}

  logIn(): void {

  }

  logOut(): void {
    this.router.navigate(['/']);
  }
}