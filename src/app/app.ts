import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app',
  template: `
  <h1>Angular 2 Node.js</h1>
  <router-outlet></router-outlet>
  `
})
export class App {
}

@Component({
  template: `
    <h3>Mammals List</h3>
    <ul class="menu">
      <li *ngFor="let m of mammals" (click)="showDetail(m.id)" class="item"> 
        <span>{{m.name}}</span>
      </li>
    </ul>
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
      margin-bottom: 10px;
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
