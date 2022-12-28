import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ResolveEnd } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  forbiddenUsernames = ['Chris', 'Anna'];
  forbiddenEmailsAddresses = ['test@test.com'];
  signupForm: FormGroup;

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], [this.forbiddenEmails.bind(this)]),
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });

    // this.signupForm.valueChanges.subscribe((value) => {
    //   console.log(value);
    // })

    // this.signupForm.statusChanges.subscribe((status) => {
    //   console.log(status);
    // });

    this.signupForm.setValue({
      'userData': {
        'username': 'Angel',
        'email': 'angelmitrov2001@yahoo.com',
      },
      'gender': 'male',
      'hobbies': []
    })

    this.signupForm.patchValue({
      'userData': {
        'username': 'Angel Mitrov'
      }
    })
  }

  onSubmit() {
    console.log(this.signupForm)
    this.signupForm.reset();
  }

  onAddHobby() {
    const formControl = new FormControl(null, [Validators.required]);
    (<FormArray>this.signupForm.get('hobbies')).push(formControl);
  }

  getHobbieControls() {
    return (<FormArray>this.signupForm.get('hobbies')).controls;
  }

  forbiddenNames(control: FormControl): { [key: string]: boolean } {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return { 'nameIsForbidden': true }
    }
    return null;
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((res, rej) => {
      setTimeout(() => {
        if (this.forbiddenEmailsAddresses.indexOf(control.value) !== -1) {
          res({ 'emailIsForbidden': true })
        } else {
          res(null)
        }
      }, 1500)
    })
    return promise;
  }
}
