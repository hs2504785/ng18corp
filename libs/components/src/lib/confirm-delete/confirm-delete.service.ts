import { Injectable, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({ providedIn: 'root' })
export class ConfirmationDeleteService {
  private ngbModal = inject(NgbModal);

  async openConfirmDeleteDialog() {
    const { ConfirmDeleteComponent } = await import(
      './confirm-delete.component'
    );

    return this.ngbModal.open(ConfirmDeleteComponent, {
      modalDialogClass: 'modal-sm confirm-delete-dialog',
      centered: true,
    });
  }
}
