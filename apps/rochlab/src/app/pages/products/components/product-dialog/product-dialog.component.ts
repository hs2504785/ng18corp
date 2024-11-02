import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SubmitComponent, TextfieldComponent } from '@lib/components';
import { ProductService } from '../../services/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TextfieldComponent,
    SubmitComponent,
  ],
  templateUrl: './product-dialog.component.html',
  styleUrl: './product-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDialogComponent implements OnInit, OnDestroy {
  public activeDialog = inject(NgbActiveModal);
  private fb = inject(FormBuilder);
  private productService = inject(ProductService);

  form!: FormGroup;
  isSubmitting = false;
  sub!: Subscription;
  @Input() data: any;

  constructor() {
    this.createForm();
  }

  ngOnInit(): void {
    if (this.data) {
      this.form.patchValue({
        ...this.data.WANDB,
        name: this.data.connectionName,
        type: this.data.type,
      });
    }
    // this.cd.detectChanges();
  }

  createForm() {
    this.form = this.fb.group({
      title: ['', [Validators.required]],
      category: [''],
      description: [''],
      price: ['', [Validators.required]],
    });
  }

  onFormSubmit() {
    this.isSubmitting = true;
    console.log(this.form.value, 'kooo');

    const addSub = this.productService.addProduct(this.form.value).subscribe({
      next: (res) => {
        console.log('rree', res);
      },

      complete: () => {
        this.isSubmitting = false;
        this.activeDialog.close();
      },
    });
    this.sub?.add(addSub);
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
