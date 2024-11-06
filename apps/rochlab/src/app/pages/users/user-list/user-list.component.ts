import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ConfirmationDeleteService,
  EmptyScreenComponent,
  GridSkeltonComponent,
  ToastService,
} from '@lib/components';
import { UserService } from '../services/user.service';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    GridSkeltonComponent,
    RouterLink,
    EmptyScreenComponent,
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent implements OnInit, OnDestroy {
  private userService = inject(UserService);
  private toastService = inject(ToastService);
  private confirmationDeleteService = inject(ConfirmationDeleteService);
  private router = inject(Router);
  isLoading = this.userService.isLoading;
  users = this.userService.users;
  sub!: Subscription;

  ngOnInit(): void {
    this.sub = this.userService.fetchAll().subscribe();
  }

  async openAddModal() {
    // event.stopImmediatePropagation();
    const modalRef = await this.userService.openDialog();

    const modalSub = modalRef.closed.subscribe({
      next: (res: any) => {
        if (res) {
          // this.params.context.componentParent.editSuccess(res);
        }
      },
      complete: () => {
        // this.cd.detectChanges()
      },
    });
    this.sub?.add(modalSub);
  }

  async openConfirmDeleteModel(event: Event, itemId: any) {
    event.stopImmediatePropagation();

    const modalRef: any =
      await this.confirmationDeleteService.openConfirmDeleteDialog();

    modalRef.componentInstance.title = 'Remove User';
    modalRef.componentInstance.desc =
      'Are you sure you want to delete this user?';

    modalRef.closed.subscribe((shouldRemove: any) => {
      if (shouldRemove) {
        this.deleteUser(itemId);
      }
    });
  }

  deleteUser(itemId: any) {
    const removeSub = this.userService.delete(itemId).subscribe(() => {
      this.toastService.success('User deleted successfully');
      removeSub.unsubscribe();
    });
  }

  async openEditModal(event: Event, data: any) {
    event.stopImmediatePropagation();
    await this.userService.openDialog(data);
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
