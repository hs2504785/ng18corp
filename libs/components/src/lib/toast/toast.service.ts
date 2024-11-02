import { Injectable, TemplateRef } from '@angular/core';

export interface ToastInfo {
  header: string;
  className: string;
  delay?: number;
  textOrTpl?: any;
  autohide?: boolean;
  iconUrl?: any;
  size?: any;
  template?: any;
  buttons?: any;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  // private cdService = inject(CdService);
  toasts: ToastInfo[] = [];

  private showToast(
    textOrTpl: string | TemplateRef<any>,
    toastClass: string,
    options: any = {}
  ) {
    this.toasts = [
      ...this.toasts,
      { textOrTpl, className: toastClass, ...options },
    ];

    // isDynamicComp && this.triggerCdFormDynamicComp();
  }

  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.showToast(textOrTpl, '', options);
  }

  primary(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.showToast(textOrTpl, 'primary', options);
  }

  success(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.showToast(textOrTpl, 'success', {
      iconUrl: 'bi bi-check-circle-fill',
      ...options,
    });
  }

  error(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.showToast(textOrTpl, 'danger', {
      iconUrl: 'assets/svg-icons/info-circle.svg',
      ...options,
    });
  }

  info(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.showToast(textOrTpl, 'secondary', options);
  }

  warning(
    textOrTpl: string | TemplateRef<any>,
    options: any = {},
    isDynamicComp = false
  ) {
    // this.showToast(textOrTpl, 'warning', options);
    this.showToast(textOrTpl, 'warning', {
      iconUrl: 'assets/svg-icons/warning-alert-triangle.svg',
      ...options,
    });
  }

  remove(toast: any) {
    this.toasts = this.toasts.filter((t) => t !== toast);
  }

  clear() {
    this.toasts.splice(0, this.toasts.length);
  }

  triggerCdFormDynamicComp() {
    // this.cdService.triggerCd.set(true);

    setTimeout(() => {
      // this.cdService.triggerCd.set(false);
    });
  }
}
