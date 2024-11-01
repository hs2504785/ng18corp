import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  sub!: Subscription;
  private productService = inject(ProductService);
  selectedProduct = this.productService.selectedProduct;

  ngOnInit() {
    this.sub = this.productService.fetchProducts().subscribe(() => {
      const productId: any = this.route.snapshot.paramMap.get('id');
      this.productService.selectProduct(productId);
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
