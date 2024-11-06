import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartStoreService } from './services/cart-store.service';
import { RouterLink } from '@angular/router';
import { EmptyScreenComponent } from '@lib/components';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink, EmptyScreenComponent],
  templateUrl: './cart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent {
  private cartService = inject(CartStoreService);

  cartItems = this.cartService.cartItems;
  totalItems = this.cartService.totalItems;
  totalAmount = this.cartService.totalAmount;

  updateQuantity(productId: number, quantity: number) {
    this.cartService.updateQuantity(productId, quantity);
  }

  removeFromCart(productId: number) {
    this.cartService.removeFromCart(productId);
  }

  clearCart() {
    this.cartService.clearCart();
  }
}
