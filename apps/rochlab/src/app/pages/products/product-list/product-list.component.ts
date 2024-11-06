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
import { CartStoreService } from '@roch/pages/cart/services/cart-store.service';

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
  private cartStore = inject(CartStoreService);
  isLoading = this.productService.isLoading;
  products = this.productService.products;
  sub!: Subscription;

  ngOnInit(): void {
    this.sub = this.productService.fetchAll().subscribe();
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
    this.productService.selectedId.set(item.id);
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
    const removeSub = this.productService.delete(productId).subscribe(() => {
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

  getItemQuantity = (productId: number) =>
    this.cartStore.getItemQuantity(productId);

  addToCart(event: Event, product: any) {
    event.stopImmediatePropagation();
    this.cartStore.addToCart(product);
  }

  increaseQuantity(event: Event, productId: number) {
    event.stopImmediatePropagation();
    const currentQty = this.getItemQuantity(productId)();
    this.cartStore.updateQuantity(productId, currentQty + 1);
  }

  decreaseQuantity(event: Event, productId: number) {
    event.stopImmediatePropagation();
    const currentQty = this.getItemQuantity(productId)();
    if (currentQty === 1) {
      this.cartStore.removeFromCart(productId);
    } else {
      this.cartStore.updateQuantity(productId, currentQty - 1);
    }
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
