import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  inject,
  OnDestroy,
} from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { SvgIconComponent } from 'angular-svg-icon';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ui-select',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    SvgIconComponent,
    NgbTooltipModule
],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent implements OnInit, OnChanges, OnDestroy {
  private cd = inject(ChangeDetectorRef);
  @Input() control!: any;
  @Input() label!: string;
  @Input() controlName!: string;
  @Input() required!: boolean;
  @Input() help!: string;
  @Input() placeholder!: string;
  @Input() errorMessage!: string;
  @Input() tooltipText!: string;
  @Input() options!: { name: string; value: any }[];
  @Input() defaultOptionText = 'Select an option';
  @Input() isDisabled = false;
  @Input() isReadonly = false;
  @Output() optionChange = new EventEmitter<any>();
  @Input() formSubmitted!: Observable<void>;

  sub!: Subscription;
  showError = false;
  patternErroeMsg = '';

  handleErrorDisplay() {
    const isInvalid = this.getErrorMessage();

    if (isInvalid) {
      this.showError = true;
    } else {
      this.showError = false;
    }
  }

  ngOnInit() {
    this.sub = this.control?.valueChanges.subscribe((value: any) => {
      this.handleErrorDisplay();
      this.optionChange.emit(value);
    });

    const formSub = this.formSubmitted?.subscribe(() => {
      this.control.markAsTouched();
      this.handleErrorDisplay();
      this.cd.detectChanges();
    });

    this.sub?.add(formSub);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isDisabled']) {
      if (this.isDisabled) {
        this.control.disable();
      } else {
        this.control.enable();
      }
    }
  }

  private getErrorMessage(): string {
    if (this.isControlInvalidAndDirty()) {
      let message = '';

      if (this.control.errors?.invalidPattern) {
        message = this.control.errors.invalidPattern.errMsg;
      } else if (this.control.errors?.range) {
        message = `Valid range: ${this.control.errors?.range.value}`;
      } else if (this.errorMessage) {
        message = this.errorMessage;
      } else {
        const fieldName = this.label || this.controlName;
        message = `${fieldName} is required.`;
      }

      this.patternErroeMsg = message;
      return message;
    }
    return '';
  }

  isControlInvalidAndDirty(): boolean {
    return (
      !!this.control &&
      this.control.invalid &&
      (this.control.touched || this.control.dirty)
    );
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
