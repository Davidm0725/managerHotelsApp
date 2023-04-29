import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<app-spinner></app-spinner>
  <div>
      <router-outlet></router-outlet>
  </div>`,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'managerHotelsApp';
}
