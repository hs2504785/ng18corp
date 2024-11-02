import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { LoaderInlineComponent } from '../loader-inline/loader-inline.component';

@Component({
  selector: 'lib-submit',
  standalone: true,
  imports: [LoaderInlineComponent],
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubmitComponent {
  @Input() formName!: string;
  @Input() isSubmitting = false;
  @Input() isInvalid = true;
  @Input() submitText = 'Create';
  @Input() submitingText = 'Creating';
}
