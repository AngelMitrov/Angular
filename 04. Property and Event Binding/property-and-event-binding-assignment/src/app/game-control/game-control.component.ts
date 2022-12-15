import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent {
  @Output() intervalFire = new EventEmitter<number>()
  interval;
  counter = 0;

  onStart() {
    this.interval = setInterval(() => {
      this.intervalFire.emit(this.counter);
      this.counter++
    }, 1000)
  }

  onStop() {
    clearInterval(this.interval);
    this.counter = 0;
  }
}
