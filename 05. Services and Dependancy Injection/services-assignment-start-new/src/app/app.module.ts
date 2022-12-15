import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ActiveUsersComponent } from './active-users/active-users.component';
import { InactiveUsersComponent } from './inactive-users/inactive-users.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, ActiveUsersComponent, InactiveUsersComponent],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
