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
import { Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TextfieldComponent,
    SubmitComponent,
  ],
  templateUrl: './user-dialog.component.html',
  styleUrl: './user-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDialogComponent implements OnInit, OnDestroy {
  public activeDialog = inject(NgbActiveModal);
  public toastService = inject(ToastService);
  private fb = inject(FormBuilder);
  private userService = inject(UserService);

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
      email: ['', [Validators.required, Validators.email]],
      username: [''],
      name: this.fb.group({
        firstname: [''],
        lastname: [''],
      }),
      phone: [''],
      address: this.fb.group({
        street: [''],
        number: [],
        city: [''],
        zipcode: [''],
        geolocation: this.fb.group({
          lat: [''],
          long: [''],
        }),
      }),
    });
  }

  onFormSubmit() {
    this.isSubmitting = true;

    const serviceMethod = this.data
      ? this.userService.update(this.data.id, this.form.value)
      : this.userService.create(this.form.value);

    const successMessage = this.data
      ? 'User updated successfully'
      : 'User added successfully';

    this.subscribeToService(serviceMethod, successMessage);
  }

  subscribeToService(serviceMethod: any, successMessage: any) {
    const integrationSub = serviceMethod.subscribe({
      next: (res: any) => {
        this.isSubmitting = false;
        this.toastService.success(successMessage);
        this.activeDialog.close();
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
