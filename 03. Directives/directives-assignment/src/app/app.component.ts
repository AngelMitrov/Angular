import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  toggle = false;
  logger = [];
  onToggle() {
    this.toggle = !this.toggle
    this.logger.push(new Date())
  }
}
