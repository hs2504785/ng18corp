import { Injectable } from '@angular/core';
import { ProductInterface } from '../types/product.interface';
import { ApiBaseService } from '@lib/services';

@Injectable({ providedIn: 'root' })
export class ProductService extends ApiBaseService<ProductInterface> {
  constructor() {
    super('products');
  }

  get products() {
    return this.items;
  }

  override async openDialog(rowData?: any) {
    const { ProductDialogComponent } = await import(
      '../components/product-dialog/product-dialog.component'
    );
    return super.openDialog(ProductDialogComponent, rowData);
  }
}
