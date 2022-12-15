import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  subscriptions = ["Basic", "Advanced", "Pro"]
  defaultSubscription = "Advanced";
  showFormData = false;
  user = {
    email: '',
    subscription: '',
    password: ''
  }

  onSubmit(form: NgForm) {
    this.showFormData = true;
    this.user.email = form.value.email;
    this.user.subscription = form.value.subscriptions;
    this.user.password = form.value.password;
    form.reset();
  }
}
