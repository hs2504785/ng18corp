import { inject, signal, computed } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of, tap, finalize } from 'rxjs';
import { ApiService } from './api.service';

export abstract class ApiBaseService<T> {
  protected ngbModal = inject(NgbModal);
  protected apiService = inject(ApiService);

  protected isLoaded = signal(false);
  isLoading = signal(false);
  selectedId = signal<string | null>(null);
  protected items = signal<T[]>([]);

  selected = computed(() => {
    const itemId = this.selectedId();
    if (itemId) return this.items().find((item: any) => item.id === +itemId);
    return null;
  });

  constructor(protected apiUrl: string) {}

  fetchAll(): Observable<T[]> {
    if (this.isLoaded()) {
      return of(this.items());
    }

    this.isLoading.set(true);
    return this.apiService.getAll(this.apiUrl).pipe(
      tap((data: T[]) => this.items.set(data)),
      finalize(() => {
        this.isLoaded.set(true);
        this.isLoading.set(false);
      })
    );
  }

  getById(id: string | number): Observable<T | undefined> {
    if (this.items().length) {
      const item = this.items().find((item: any) => item.id === +id);
      return of(item);
    }
    return this.apiService.getById(this.apiUrl, id);
  }

  create(item: T): Observable<T> {
    return this.apiService.create(this.apiUrl, item).pipe(
      tap((res: T) => {
        this.items.update((items) => [...items, { ...res, ...item }]);
      })
    );
  }

  update(id: string, updatedItem: T): Observable<T> {
    return this.apiService.update(this.apiUrl, id, updatedItem).pipe(
      tap((res: T) => {
        this.items.update((items) =>
          items.map((item: any) =>
            item.id === +id ? { ...res, id: +id } : item
          )
        );
      })
    );
  }

  delete(id: string): Observable<void> {
    return this.apiService.delete(this.apiUrl, id).pipe(
      tap(() => {
        this.items.update((items) =>
          items.filter((item: any) => item.id !== +id)
        );
      })
    );
  }

  protected async openDialog(
    component: any,
    rowData?: any
  ): Promise<NgbModalRef> {
    const modalRef: NgbModalRef = this.ngbModal.open(component, {
      centered: true,
      scrollable: true,
      size: 'md',
      windowClass: 'dialog',
    });

    if (rowData) {
      modalRef.componentInstance.data = rowData;
    }

    return modalRef;
  }
}
