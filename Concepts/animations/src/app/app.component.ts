import { Component } from '@angular/core';
import { animate, group, keyframes, state, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [
    trigger('divState', [
      state('normal', style({
        'background-color': 'red',
        transform: 'translateX(0)'
      })),
      state('highlighted', style({
        backgroundColor: 'blue',
        transform: 'translateX(100px)'
      })),
      transition('normal <=> highlighted', animate(300)),
    ]),
    trigger('wildState', [
      state('normal', style({
        'background-color': 'red',
        transform: 'translateX(0) scale(1)'
      })),
      state('highlighted', style({
        backgroundColor: 'blue',
        transform: 'translateX(100px) scale(1)'
      })),
      state('shrunken', style({
        'background-color': 'green',
        transform: 'translateX(0px) scale(0.5)'
      })),
      transition('normal => highlighted', animate(300)),
      transition('highlighted => normal', animate(800)),
      transition('shrunken <=> *', [
        style(
          {
            'background-color': 'orange'
          }
        ),
        animate(1000,
          style(
            {
              'border-radius': '50px'
            }
          )
        ),
        animate(500)
      ]),
    ]),
    trigger('list1', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0px)'
      })),
      transition('void => *',
        [
          style({
            opacity: 0,
            transform: 'translateX(-100px)'
          }),
          animate(300)
        ]),
      transition('* => void',
        [
          animate(300, style({
            transform: 'translateX(100px)',
            opacity: 0
          }))
        ]),
    ]),
    trigger('list2', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('void => *', [
        animate(1000, keyframes([
          style({
            offset: 0,
            transform: 'translateX(-100px)',
            opacity: 0,
          }),
          style({
            offset: 0.3,
            transform: 'translateX(-50px)',
            opacity: 0.5
          }),
          style({
            offset: 0.8,
            transform: 'translateX(-20px)',
            opacity: 1
          }),
          style({
            offset: 1,
            transform: 'translateX(0px)',
            opacity: 1
          }),
        ]))
      ]),
      transition('* => void', [
        group([
          animate(200, style({
            border: '2px solid darkred'
          })),
          animate(1000, style({
            transform: 'translateX(100px)',
            opacity: 0
          }))
        ])
      ]),
    ]),
  ]
})
export class AppComponent {
  state = 'normal';
  wildState = 'normal';
  list = ['Milk', 'Sugar', 'Bread'];

  onAnimate() {
    this.state === 'normal' ? this.state = 'highlighted' : this.state = 'normal';
    this.wildState === 'normal' ? this.wildState = 'highlighted' : this.wildState = 'normal';
  }

  onShrink() {
    this.wildState = 'shrunken';
  }

  onAdd(item) {
    this.list.push(item);
  }
  onDelete(item) {
    this.list.splice(this.list.indexOf(item), 1);
  }
  onAnimationStarted(event) {
    console.log(event);
  }
  onAnimationEnded(event) {
    console.log(event);
  }
}
