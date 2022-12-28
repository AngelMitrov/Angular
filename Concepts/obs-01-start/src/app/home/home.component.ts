import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs'
import { map, filter } from 'rxjs/operators'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstObsSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    // this.firstObsSubscription = interval(1000).subscribe(count => {
    //   console.log(count);
    // })

    const customIntervalObservable = new Observable(observer => {
      let count = 0
      setInterval(() => {
        observer.next(count);

        if (count === 2) {
          observer.complete()
        }

        if (count > 3) {
          observer.error(new Error("Count is greater than 3!"))
        }
        count++;
      }, 1000)
    });


    this.firstObsSubscription = customIntervalObservable
      .pipe(
        filter(data => {
          return data > 0;
        }), map(data => {
          return `Round: ${data}`;
        })).subscribe({
          next: (data) => {
            console.log(data)
          },
          error: (error) => {
            console.log(error)
          },
          complete: () => {
            console.log("Complete!")
          }
        })
  }



  ngOnDestroy() {
    this.firstObsSubscription.unsubscribe()
  }
}
