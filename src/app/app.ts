import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app',
  template: `
  <p>Hello Angular Universal App</p>
  <img style="max-width: 100%" src="images/1.jpg">
  <router-outlet></router-outlet>
  `
})
export class App {

}

@Component({
  selector: 'home',
  template: 'Home component'
})
export class Home extends OnInit {
  ngOnInit(): void {
    console.log('home');
  }
}
