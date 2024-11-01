import { inject, Injectable } from '@angular/core';
import { ApiService, SignalStateService } from '@lib/services';
import { tap } from 'rxjs';
import { ProductInterface } from '../types/product.interface';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private apiService = inject(ApiService);
  private signalStateService = inject(SignalStateService);
  private readonly apiUrl = 'products';

  get products() {
    return this.signalStateService.entities;
  }

  fetchProducts() {
    return this.apiService.getAll(this.apiUrl).pipe(
      tap((data) => {
        this.signalStateService.setEntities(data);
      })
    );
  }

  addProduct(product: ProductInterface) {
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

  deleteProduct(id: string): void {
    this.apiService.delete(this.apiUrl, id).pipe(
      tap(() => {
        this.signalStateService.removeEntity((product) => product.id === id);
      })
    );
  }
}
