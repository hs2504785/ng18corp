import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'lib-loader-inline',
  standalone: true,
  imports: [],
  template: `
    <div class="d-flex align-items-center">
      <div class="spinner-border spinner-border-sm me-2" role="status">
        <span class="visually-hidden">{{ loaderText }}</span>
      </div>
      <span>{{ loaderText }}</span>
    </div>
  `,
  styles: [
    `
      :host {
        display: flex;
        justify-content: center;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderInlineComponent {
  @Input() loaderText = 'Loading...';
}
