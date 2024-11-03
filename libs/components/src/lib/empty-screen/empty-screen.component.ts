import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
@Component({
  selector: 'lib-empty-screen',
  standalone: true,
  templateUrl: './empty-screen.component.html',
  styleUrls: ['./empty-screen.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage],
})
export class EmptyScreenComponent {
  @Input() imgName = 'empty-state.jpg';
  @Input() width = 200;
  @Input() height = 200;
  @Input() title = 'Nothing to show here!';
  @Input() desc = 'We got nothing to show... you got us!';
}
