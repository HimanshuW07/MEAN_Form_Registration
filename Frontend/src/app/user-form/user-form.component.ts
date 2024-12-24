import { Component } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {
  user = { name: '', email: '', password: '', age: 0 };

  constructor(private userService: UserService) {}

  saveUser(): void {
    this.userService.createUser(this.user).subscribe(() => {
      alert('User saved successfully');
    });
  }
}
