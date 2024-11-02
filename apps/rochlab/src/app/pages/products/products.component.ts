import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { RouterOutlet } from '@angular/router';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ProductListComponent, RouterOutlet],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  private productService = inject(ProductService);
  async openAddModal() {
    // event.stopImmediatePropagation();
    const modalRef = await this.productService.openDialog();

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
    // this.sub?.add(modalSub);
  }
}
