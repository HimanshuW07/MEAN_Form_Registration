import { Component } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  newUser: any = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    retypePassword: '',
    contact: '',
    gender: 'male'
  };

  constructor(private userService: UserService) {}

  saveUser(): void {
    if (this.newUser.password !== this.newUser.retypePassword) {
      alert('Passwords do not match!');
      return;
    }

    const userToSave = {
      name: `${this.newUser.firstName} ${this.newUser.lastName}`,
      email: this.newUser.email,
      password: this.newUser.password,
      contact: this.newUser.contact,
      gender: this.newUser.gender
    };

    this.userService.createUser(userToSave).subscribe(
      (response) => {
        alert('User saved successfully!');
        this.resetForm();
      },
      (error) => {
        console.error('Error saving user:', error);
        alert('Failed to save user.');
      }
    );
  }

  resetForm(): void {
    this.newUser = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      retypePassword: '',
      contact: '',
      gender: 'male'
    };
  }
}
