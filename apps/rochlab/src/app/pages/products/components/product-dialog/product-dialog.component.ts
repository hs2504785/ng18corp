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
import {
  SubmitComponent,
  TextfieldComponent,
  ToastService,
} from '@lib/components';
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
  public toastService = inject(ToastService);
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
      this.form.patchValue(this.data);
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

    const serviceMethod = this.data
      ? this.productService.update(this.data.id, {
          ...this.form.value,
          image: this.data.image,
        })
      : this.productService.create(this.form.value);

    const successMessage = this.data
      ? 'Product updated successfully'
      : 'Product added successfully';

    this.subscribeToService(serviceMethod, successMessage);

    // const addSub = this.productService.addProduct(this.form.value).subscribe({
    //   next: (res) => {
    //     console.log('rree', res);
    //   },

    //   complete: () => {
    //     this.isSubmitting = false;
    //     this.activeDialog.close();
    //   },
    // });
    // this.sub?.add(addSub);
  }

  subscribeToService(serviceMethod: any, successMessage: any) {
    const integrationSub = serviceMethod.subscribe({
      next: (res: any) => {
        this.isSubmitting = false;
        this.toastService.success(successMessage);
        this.activeDialog.close();
      },
      error: () => {
        // this.cd.detectChanges();
        // this.toastService.error(this.translateService.instant('WANDB_INTEGRATION_FAILURE'));
      },
      complete: () => {
        this.isSubmitting = false;
        this.activeDialog.close();
      },
    });

    this.sub?.add(integrationSub);
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
