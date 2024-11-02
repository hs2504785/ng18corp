import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'lib-confirm-delete',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDeleteComponent implements OnInit {
  public activeModal = inject(NgbActiveModal);
  iconUrl!: string;
  @Input() title = '';
  @Input() desc = '';
  @Input() btnClassType = '';
  @Input() btnText = 'Delete';
  @Input() icon = '';
  @Input() fromEditCustomApi = false;
  cancelVal = 'Cancel';

  ngOnInit() {
    if (this?.icon) {
      this.iconUrl = this.icon;
    } else {
      this.iconUrl = 'assets/svg-icons/trash.svg';
    }
  }
}
