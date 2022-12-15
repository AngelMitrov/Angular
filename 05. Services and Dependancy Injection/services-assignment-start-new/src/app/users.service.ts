import { Injectable, OnInit } from '@angular/core';
import { CounterService } from './counter.service';

@Injectable({ providedIn: 'root' })
export class UsersService implements OnInit {
  activeUsers = ['Max', 'Anna'];
  inactiveUsers = ['Chris', 'Manu'];
  constructor(private counterService: CounterService) {
    this.counterService.increaseCounter.subscribe((counter: number) => {
      console.log('Executed: ' + counter + ' times');
    });
  }

  ngOnInit() {}

  onStatusChange(id: number, status: string) {
    if (status === 'active') {
      this.activeUsers.push(this.inactiveUsers[id]);
      this.inactiveUsers.splice(id, 1);
      this.counterService.incrementInactiveToActiveCounter();
    } else {
      this.inactiveUsers.push(this.activeUsers[id]);
      this.activeUsers.splice(id, 1);
      this.counterService.incrementActiveToInactiveCounter();
    }
  }
}
