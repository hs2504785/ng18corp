import { computed, inject, Injectable, signal } from '@angular/core';
import { ApiService, SignalStateService } from '@lib/services';
import { of, tap } from 'rxjs';
import { ProductInterface } from '../types/product.interface';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private ngbModal = inject(NgbModal);
  private apiService = inject(ApiService);
  private signalStateService = inject(SignalStateService);
  private readonly apiUrl = 'products';
  private isLoaded = signal(false); // Signal to track if products are loaded

  // Signals for product list and selected product ID
  selectedProductId = signal<string | null>(null);

  // Derive the selected product based on selectedProductId and products
  selectedProduct = computed(() => {
    const productId = this.selectedProductId();
    if (productId)
      return this.products().find((product) => product.id === +productId);

    return null;
  });

  get products() {
    return this.signalStateService.entities;
  }

  fetchProducts() {
    if (this.isLoaded()) {
      return of(this.products());
    }

    return this.apiService.getAll(this.apiUrl).pipe(
      tap((data) => {
        this.isLoaded.set(true);
        this.signalStateService.setEntities(data);
      })
    );
  }

  addProduct(product: ProductInterface) {
    product.image = 'https://picsum.photos/150/150';
    return this.apiService.create(this.apiUrl, product).pipe(
      tap((newProduct) => {
        this.signalStateService.addEntity(newProduct);
      })
    );
  }

  updateProduct(id: string, updatedProduct: ProductInterface): void {
    this.apiService.update(this.apiUrl, id, updatedProduct).pipe(
      tap((updated) => {
        this.signalStateService.updateEntity(
          updated,
          (product) => product.id === id
        );
      })
    );
  }

  deleteProduct(id: string) {
    return this.apiService.delete(this.apiUrl, id).pipe(
      tap(() => {
        this.signalStateService.removeEntity((product) => product.id === id);
      })
    );
  }

  // Select a product by ID
  selectProduct(id: string) {
    this.selectedProductId.set(id);
  }

  // Clear product selection
  clearSelection() {
    this.selectedProductId.set(null);
  }

  async openDialog(rowData?: any) {
    const { ProductDialogComponent } = await import(
      '../components/product-dialog/product-dialog.component'
    );
    const modalRef: NgbModalRef = this.ngbModal.open(ProductDialogComponent, {
      centered: true,
      scrollable: true,
      size: 'md',
      windowClass: 'product-dialog',
    });

    if (rowData) {
      modalRef.componentInstance.data = rowData;
      // modalRef.componentInstance.cd.detectChanges();
    }

    return modalRef;
  }
}
