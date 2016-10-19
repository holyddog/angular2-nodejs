import { Component } from '@angular/core';

@Component({
    template: `
        <h1>Full Layout</h1>
        <main>
            <router-outlet></router-outlet>
        </main>
        <footer></footer>
    `
})

export class FullLayout {
}

@Component({
    template: `
        <h1>Simple Layout</h1>
        <main>
            <router-outlet></router-outlet>
        </main>
    `
})

export class SimpleLayout {
}