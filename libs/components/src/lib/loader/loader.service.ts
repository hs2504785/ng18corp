import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoaderState } from './loader.interface';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private loaderSubject = new BehaviorSubject<LoaderState>({ show: false });

  loaderState = this.loaderSubject.asObservable();

  constructor() {}
  hideTopLoader = signal(false);

  show() {
    this.loaderSubject.next({ show: true } as LoaderState);
  }

  hide() {
    this.loaderSubject.next({ show: false } as LoaderState);
  }
}
