import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from "./user-list/user-list.component";

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, UserListComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent {}
