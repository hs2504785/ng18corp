import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  TemplateRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from './toast.service';
// eslint-disable-next-line @nx/enforce-module-boundaries

@Component({
  selector: 'lib-toast',
  standalone: true,
  imports: [CommonModule, NgbToastModule],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastComponent {
  @HostBinding('class')
  toastContainerClass = 'toast-container position-fixed bottom-0 end-0 p-3';

  @HostBinding('style.z-index')
  toastContainerZIndex = '1200';

  constructor(public toastService: ToastService) {}

  isTemplate(toast: any) {
    return toast.textOrTpl instanceof TemplateRef;
  }

  isTemplatePartial(toast: any) {
    return toast.template instanceof TemplateRef;
  }

  closeToast(toast: any) {
    this.toastService.remove(toast);
  }
}
