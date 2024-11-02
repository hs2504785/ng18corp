import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lib-grid-skelton',
  standalone: true,
  imports: [],
  templateUrl: './grid-skelton.component.html',
  styleUrls: ['./grid-skelton.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridSkeltonComponent {
  skeltonData: { width: string; margin: string }[] = [
    { width: '96px', margin: '32px' },
    { width: '212px', margin: '32px' },
    { width: '132px', margin: '32px' },
    { width: '96px', margin: '32px' },
    { width: '212px', margin: '32px' },
    { width: '132px', margin: '32px' },
  ];
  skeltonData2: { width: string; margin: string }[] = [
    { width: '60px', margin: '32px' },
    { width: '277px', margin: '32px' },
    { width: '177px', margin: '32px' },
    { width: '60px', margin: '32px' },
    { width: '277px', margin: '32px' },
    { width: '177px', margin: '32px' },
  ];
}
