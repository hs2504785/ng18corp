import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ProductService } from '../services/product.service';
import { Subscription } from 'rxjs';
import { SeeAllPipe } from '@lib/pipes';
import { Router } from '@angular/router';
import {
  ConfirmationDeleteService,
  EmptyScreenComponent,
  GridSkeltonComponent,
  ToastService,
} from '@lib/components';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage,
    SeeAllPipe,
    GridSkeltonComponent,
    EmptyScreenComponent,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent implements OnInit, OnDestroy {
  private productService = inject(ProductService);
  private toastService = inject(ToastService);
  private confirmationDeleteService = inject(ConfirmationDeleteService);
  private router = inject(Router);
  isLoading = this.productService.isLoading;
  products = this.productService.products;
  sub!: Subscription;

  ngOnInit(): void {
    this.sub = this.productService.fetchProducts().subscribe();
  }

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
    this.sub?.add(modalSub);
  }

  goToDetails(item: any) {
    this.productService.selectProduct(item.id);
    this.router.navigate(['products', item.id, 'detail']);
  }

  async openConfirmDeleteModel(event: Event, productId: any) {
    event.stopImmediatePropagation();

    const modalRef: any =
      await this.confirmationDeleteService.openConfirmDeleteDialog();

    modalRef.componentInstance.title = 'Delete Product';
    modalRef.componentInstance.desc =
      'Are you sure you want to delete this product?';

    modalRef.closed.subscribe((shouldRemove: any) => {
      if (shouldRemove) {
        this.deleteProduct(productId);
      }
    });
  }

  deleteProduct(productId: any) {
    const removeSub = this.productService
      .deleteProduct(productId)
      .subscribe(() => {
        this.toastService.success('Product deleted successfully');
        removeSub.unsubscribe();
      });
  }

  async openEditModal(event: Event, data: any) {
    event.stopImmediatePropagation();
    const modalRef = await this.productService.openDialog(data);

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

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
