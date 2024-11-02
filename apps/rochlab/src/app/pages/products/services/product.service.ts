import { computed, inject, Injectable, signal } from '@angular/core';
import { ApiService, ResourceService } from '@lib/services';
import { of, tap, finalize } from 'rxjs';
import { ProductInterface } from '../types/product.interface';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Injectable({ providedIn: 'root' })
export class ProductService extends ResourceService<any> {
  private ngbModal = inject(NgbModal);
  private apiService = inject(ApiService);
  private readonly apiUrl = 'products';
  private isLoaded = signal(false);
  products = this.resources;
  isLoading = signal(false);

  // Signals for product list and selected product ID
  selectedProductId = signal<string | null>(null);

  // Derive the selected product based on selectedProductId and products
  selectedProduct = computed(() => {
    const productId = this.selectedProductId();
    if (productId)
      return this.products().find((product) => product.id === +productId);

    return null;
  });

  fetchProducts() {
    if (this.isLoaded()) {
      return of(this.products());
    }

    this.isLoading.set(true);
    return this.apiService.getAll(this.apiUrl).pipe(
      tap(this.setResources),
      finalize(() => {
        this.isLoaded.set(true);
        this.isLoading.set(false);
      })
    );
  }

  addProduct(product: ProductInterface) {
    product.image = 'https://picsum.photos/150/150';
    return this.apiService.create(this.apiUrl, product).pipe(
      tap((res: ProductInterface) => {
        this.upsertResource(res);
      })
    );
  }

  updateProduct(id: string, updatedProduct: ProductInterface) {
    return this.apiService.update(this.apiUrl, id, updatedProduct).pipe(
      tap((res: ProductInterface) => {
        this.upsertResource(res);
      })
    );
  }

  deleteProduct(id: string) {
    return this.apiService
      .delete(this.apiUrl, id)
      .pipe(tap(() => this.removeResource(id)));
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
    }

    return modalRef;
  }
}
