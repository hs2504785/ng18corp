import { Injectable, computed, inject } from '@angular/core';
import { ToastService } from '@lib/components';
import { StoreService } from '@lib/services';
import { CartItem, CartState } from '../types/cart.interface';

@Injectable({
  providedIn: 'root',
})
export class CartStoreService {
  private store = inject(StoreService);
  private toastService = inject(ToastService);
  private readonly STORE_KEY = 'cart';

  // Initialize cart state
  constructor() {
    this.initializeCart();
  }

  private initializeCart() {
    const initialState: CartState = {
      items: [],
      totalItems: 0,
      totalAmount: 0,
      lastUpdated: new Date(),
    };

    // Try to restore cart from localStorage
    const savedCart = localStorage.getItem(this.STORE_KEY);
    if (savedCart) {
      this.store.setState(this.STORE_KEY, JSON.parse(savedCart));
    } else {
      this.store.setState(this.STORE_KEY, initialState);
    }
  }

  // Selectors
  cart = this.store.select(this.STORE_KEY);

  cartItems = computed(() => this.cart()?.items || []);

  totalItems = computed(() => this.cart()?.totalItems || 0);

  totalAmount = computed(() => this.cart()?.totalAmount || 0);

  getItemQuantity(productId: number) {
    return computed(() => {
      const item = this.cartItems().find(
        (item: CartItem) => item.productId === productId
      );
      return item?.quantity || 0;
    });
  }

  // Actions
  addToCart(product: any) {
    const currentCart = this.cart();
    const existingItem = currentCart.items.find(
      (item: CartItem) => item.productId === product.id
    );

    let updatedItems: CartItem[];
    if (existingItem) {
      updatedItems = currentCart.items.map((item: CartItem) =>
        item.productId === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      const newItem: CartItem = {
        id: Date.now(),
        productId: product.id,
        title: product.title,
        price: product.price,
        quantity: 1,
        image: product.image,
      };
      updatedItems = [...currentCart.items, newItem];
    }

    this.updateCart(updatedItems);
    this.toastService.success('Item added to cart');
  }

  removeFromCart(productId: number) {
    const currentCart = this.cart();
    const updatedItems = currentCart.items.filter(
      (item: CartItem) => item.productId !== productId
    );
    this.updateCart(updatedItems);
    this.toastService.success('Item removed from cart');
  }

  updateQuantity(productId: number, quantity: number) {
    if (quantity < 1) return;

    const currentCart = this.cart();
    const updatedItems = currentCart.items.map((item: CartItem) =>
      item.productId === productId ? { ...item, quantity } : item
    );

    this.updateCart(updatedItems);
  }

  clearCart() {
    this.initializeCart();
    this.toastService.success('Cart cleared');
  }

  private updateCart(items: CartItem[]) {
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalAmount = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const updatedCart: CartState = {
      items,
      totalItems,
      totalAmount,
      lastUpdated: new Date(),
    };

    this.store.setState(this.STORE_KEY, updatedCart);
    localStorage.setItem(this.STORE_KEY, JSON.stringify(updatedCart));
  }
}
