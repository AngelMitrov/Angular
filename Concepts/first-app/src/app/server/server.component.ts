import { Component } from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styles: [
    `
      .online {
        color: white;
      }
    `,
  ],
})
export class ServerComponent {
  serverId = 10;
  status = 'offline';

  constructor() {
    this.serverId = Math.floor(1000 * Math.random());
    this.status = Math.random() > 0.5 ? 'online' : 'offline';
  }

  getColor() {
    return this.status === 'online' ? 'green' : 'red';
  }

  GetServerStatus() {
    return this.status;
  }
}
