import { Injectable } from '@angular/core';
import { UserInterface } from '../types/user.interface';
import { ApiBaseService } from '@lib/services';

@Injectable({ providedIn: 'root' })
export class UserService extends ApiBaseService<UserInterface> {
  constructor() {
    super('users');
  }

  // Getter for backward compatibility
  get users() {
    return this.items;
  }

  override async openDialog(rowData?: any) {
    const { UserDialogComponent } = await import(
      '../components/user-dialog/user-dialog.component'
    );
    return super.openDialog(UserDialogComponent, rowData);
  }
}
