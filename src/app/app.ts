import { Component, OnInit } from '@angular/core';
import { AppService, Mammal } from './app.service';

@Component({
  selector: 'app',
  template: `
  <p>Hello Angular Universal App</p>
  <router-outlet></router-outlet>
  `
})
export class App {
}

@Component({
  selector: 'home',
  template: `
      <div>Home component</div>
      <ul>
          <li *ngFor="let m of mammals"> 
              <span>{{m.name}}</span>
          </li>
      </ul>
      <img style="max-width: 100%" src="images/1.jpg">
    `
})
export class Home implements OnInit {
	mammals: Mammal[];

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    console.log('home');
    this.getMammals();
  }

  getMammals(): void {
		this.appService.getMammals().then(
      mammals => {
        this.mammals = mammals;
      }
    );
	}
}
