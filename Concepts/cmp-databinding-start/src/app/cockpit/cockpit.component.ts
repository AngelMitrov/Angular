import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css'],
})
export class CockpitComponent implements OnInit {
  @Output('srvCreated') serverCreated = new EventEmitter<{
    serverName: string;
    serverContent: string;
  }>();

  @Output('bpCreated') blueprintCreated = new EventEmitter<{
    serverName: string;
    serverContent: string;
  }>();

  @ViewChild('serverContentInput', { static: true })
  serverContentInputViewChild: ElementRef;

  constructor() {}

  ngOnInit(): void {}

  onAddServer(serverNameInput) {
    this.serverCreated.emit({
      serverName: serverNameInput,
      serverContent: this.serverContentInputViewChild.nativeElement.value,
    });
  }

  onAddBlueprint(serverNameInput) {
    this.blueprintCreated.emit({
      serverName: serverNameInput,
      serverContent: this.serverContentInputViewChild.nativeElement.value,
    });
  }
}
