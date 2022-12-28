import { Component } from '@angular/core';

@Component({
  selector: 'app-directives',
  templateUrl: './directives.component.html',
  styleUrls: ['./directives.component.css'],
})
export class DirectivesComponent {
  showSecret = false;
  log = [];

  // onToggleDetails() {
  //   this.showSecret = !this.showSecret;
  //   this.log.push(this.log.length + 1);
  // }

  onToggleDetails() {
    this.showSecret = !this.showSecret;
    this.log.push(new Date());
  }
}
