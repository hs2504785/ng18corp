import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-textfield',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgbTooltipModule],
  templateUrl: './textfield.component.html',
  styleUrls: ['./textfield.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextfieldComponent implements OnInit, OnChanges, OnDestroy {
  private cd = inject(ChangeDetectorRef);
  @Input() control!: any;
  @Input() type: string | number = 'text';
  @Input() label!: string;
  @Input() controlName!: string;
  @Input() required!: boolean;
  @Input() help!: string;
  @Input() placeholder = '';
  @Input() errorMessage!: string;
  @Input() tooltipText!: string;
  @Input() isDisabled = false;
  @Input() isReadonly = false;
  @Input() autocomplete = 'off';
  @Input() formSubmitted!: Observable<void>;
  @Input() openFrom: any;
  @Input() modelType: any;
  @Input() selectedModelConfig: any;
  @Input() isFinedTuned: any;
  @Input() maxLength: any;
  @Input() isDisable: any;
  openSorceConfig: any;

  isMinRequired: boolean = false;
  isMaxRequired: boolean = false;
  minValue: number = 1;
  maxValue: number = 50;

  constructor(private router: Router) {}

  sub!: Subscription;
  patternErroeMsg = '';

  showError = false;

  handleErrorDisplay() {
    const isInvalid = this.getErrorMessage();

    if (isInvalid) {
      this.showError = true;
    } else {
      this.showError = false;
    }
  }

  ngOnInit() {
    if (this.router.url.split?.('/').includes('open-source-model-config')) {
      this.openSorceConfig = true;
    }
    this.handleErrorDisplay();

    this.sub = this.control?.valueChanges.subscribe(() => {
      this.handleErrorDisplay();
    });

    const formSub = this.formSubmitted?.subscribe(() => {
      this.control.markAsTouched();
      this.handleErrorDisplay();
      this.cd.detectChanges();
    });

    this.sub?.add(formSub);

    if (this.controlName === 'epochs' || this.controlName === 'batchSz') {
      this.isMaxRequired = true;
      this.isMinRequired = true;
    } else {
      this.isMaxRequired = false;
      this.isMinRequired = false;
    }
    if (this.controlName === 'batchSz') {
      this.maxValue = 128;
    }
    if (this.modelType === 'huggingFace') {
      this.setFocus();
    }
  }

  setFocus() {
    setTimeout(() => {
      if (document.getElementById('name')) {
        document.getElementById('name')?.focus();
      }
    }, 100);
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

  handleOnChange(e: any) {
    console.log(e);
    e.preventDefault();
  }
}
