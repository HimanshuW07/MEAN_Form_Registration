import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  editUser: any = null; // Holds the user being edited

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  deleteUser(id: string): void {
    const confirmation = window.confirm('Are you sure you want to delete this user?');
    if (confirmation) {
      this.userService.deleteUser(id).subscribe(() => {
        this.loadUsers(); // Refresh the user list
      });
    }
  }
  
  // Populate form with user data for editing
  setEditUser(user: any): void {
    this.editUser = { ...user }; // Create a copy to avoid mutating original
  }

  // Save updated user details
  saveUser(): void {
    if (this.editUser && this.editUser._id) {
      this.userService.updateUser(this.editUser._id, this.editUser).subscribe(() => {
        this.loadUsers(); // Refresh the user list
        this.editUser = null; // Clear edit form
      });
    }
  }

  // Cancel editing
  cancelEdit(): void {
    this.editUser = null;
  }
}
