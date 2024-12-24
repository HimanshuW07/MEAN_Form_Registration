import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { UserFormComponent } from './user-form/user-form.component';

// Define routes
const routes: Routes = [
  { path: '', redirectTo: '/register', pathMatch: 'full' },
  { path: 'register', component: UserFormComponent },
  { path: 'users', component: UsersComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UserFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes), // Import RouterModule with routes
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
