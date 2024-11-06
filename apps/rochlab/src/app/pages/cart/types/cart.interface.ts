export interface CartItem {
  id: number;
  productId: number;
  title: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface CartState {
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
  lastUpdated: Date;
}
