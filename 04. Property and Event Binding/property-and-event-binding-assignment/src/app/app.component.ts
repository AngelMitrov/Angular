import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  evenNums: number[] = []
  oddNums: number[] = []

  interval(num: number) {
    num % 2 == 0 ? this.evenNums.push(num) : this.oddNums.push(num);
  }

}
