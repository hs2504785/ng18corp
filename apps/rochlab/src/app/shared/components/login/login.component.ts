import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {
  SubmitComponent,
  TextfieldComponent,
  ToastService,
} from '@lib/components';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '@lib/services';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    TextfieldComponent,
    SubmitComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  public activeDialog = inject(NgbActiveModal);
  public toastService = inject(ToastService);
  public authService = inject(AuthService);
  private fb = inject(FormBuilder);

  form!: FormGroup;
  isSubmitting = false;
  // sub!: Subscription;
  // @Input() data: any;

  constructor() {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onFormSubmit() {
    this.authService.login(this.form.value).subscribe({
      next: (response) => {
        // this.authService.setToken(response.token);
        this.toastService.success('Login successful');
        this.activeDialog.close();
      },
      error: (err) => {
        this.toastService.error('Login failed');
        console.error(err);
      },
    });
  }
}
