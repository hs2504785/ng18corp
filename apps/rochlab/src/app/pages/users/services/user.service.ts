import { computed, inject, Injectable, signal } from '@angular/core';
import { ApiService, SignalStateService } from '@lib/services';
import { of, tap, finalize } from 'rxjs';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { UserInterface } from '../types/user.interface';

@Injectable({ providedIn: 'root' })
export class UserService {
  private ngbModal = inject(NgbModal);
  private apiService = inject(ApiService);
  private signalStateService = inject(SignalStateService);
  private readonly apiUrl = 'users';
  private isLoaded = signal(false);
  isLoading = signal(false);
  selectedUserId = signal<string | null>(null);

  selectedUser = computed(() => {
    const itemId = this.selectedUserId();
    if (itemId) return this.users().find((item) => item.id === +itemId);

    return null;
  });

  get users() {
    return this.signalStateService.entities;
  }

  fetchUsers() {
    if (this.isLoaded()) {
      return of(this.users());
    }

    this.isLoading.set(true);
    return this.apiService.getAll(this.apiUrl).pipe(
      finalize(() => {
        this.isLoaded.set(true);
        this.isLoading.set(false);
      }),
      tap((data) => {
        this.signalStateService.setEntities(data);
      })
    );
  }

  getUser(userId: any) {
    if (this.users().length) {
      const user = this.users().find((item) => item.id === +userId);
      return of(user);
    }

    return this.apiService.getById(this.apiUrl, userId);
  }

  addUser(user: UserInterface) {
    return this.apiService.create(this.apiUrl, user).pipe(
      tap((newUser) => {
        this.signalStateService.addEntity(newUser);
      })
    );
  }

  updateUser(id: string, updatedItem: UserInterface) {
    return this.apiService.update(this.apiUrl, id, updatedItem).pipe(
      tap((updated) => {
        this.signalStateService.updateEntity(updated, (item) => item.id === id);
      })
    );
  }

  deleteProduct(id: string) {
    return this.apiService.delete(this.apiUrl, id).pipe(
      tap(() => {
        this.signalStateService.removeEntity((item) => item.id === id);
      })
    );
  }

  async openDialog(rowData?: any) {
    const { UserDialogComponent } = await import(
      '../components/user-dialog/user-dialog.component'
    );
    const modalRef: NgbModalRef = this.ngbModal.open(UserDialogComponent, {
      centered: true,
      scrollable: true,
      size: 'md',
      windowClass: 'user-dialog',
    });

    if (rowData) {
      modalRef.componentInstance.data = rowData;
      // modalRef.componentInstance.cd.detectChanges();
    }

    return modalRef;
  }
}
