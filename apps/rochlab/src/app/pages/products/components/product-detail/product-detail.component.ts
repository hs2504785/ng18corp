import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, RouterLink],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  sub!: Subscription;
  private productService = inject(ProductService);
  selectedProduct: any = this.productService.selected;
  isLoading = this.productService.isLoading;

  ngOnInit() {
    this.sub = this.productService.fetchAll().subscribe(() => {
      const productId: any = this.route.snapshot.paramMap.get('id');
      this.productService.selectedId.set(productId);
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
