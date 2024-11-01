import { Component, inject } from '@angular/core';
import { LoaderService } from './loader.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'lib-loader',
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent {
  private loaderService = inject(LoaderService);
  show$: Observable<any> = this.loaderService.loaderState;
  hideTopLoader = this.loaderService.hideTopLoader;
  // ngOnInit() {
  //   this.show$ = this.loaderService.loaderState;
  // }
}
