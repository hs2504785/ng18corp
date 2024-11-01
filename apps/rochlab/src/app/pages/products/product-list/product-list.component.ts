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

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, SeeAllPipe],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent implements OnInit, OnDestroy {
  private productService = inject(ProductService);
  private router = inject(Router);
  products = this.productService.products;
  sub!: Subscription;

  ngOnInit(): void {
    this.sub = this.productService.fetchProducts().subscribe();
  }

  goToDetails(item: any) {
    this.productService.selectProduct(item.id);
    this.router.navigate(['products', item.id, 'detail']);
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
