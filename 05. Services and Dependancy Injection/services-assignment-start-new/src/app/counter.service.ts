import { EventEmitter, Injectable, OnInit } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CounterService {
  increaseCounter = new EventEmitter<number>();
  activeToInactiveCounter: number = 0;
  inactiveToActiveCounter: number = 0;
  constructor() {}

  incrementActiveToInactiveCounter() {
    console.log(
      'Active To Inactive Counter: ' + ++this.activeToInactiveCounter
    );
  }

  incrementInactiveToActiveCounter() {
    console.log(
      'Inactive To Active Counter: ' + ++this.inactiveToActiveCounter
    );
  }
}
