import { inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoaderService } from '@lib/components';

@Injectable({
  providedIn: 'root',
})
export class LoaderInterceptor implements HttpInterceptor {
  private loaderService = inject(LoaderService);
  private requests: HttpRequest<any>[] = [];

  private isUploadRequest(req: HttpRequest<any>): boolean {
    return req.body instanceof FormData;
  }

  private removeRequest(req: HttpRequest<any>) {
    const i = this.requests.indexOf(req);
    if (i >= 0) {
      this.requests.splice(i, 1);
    }

    if (this.requests.length === 0) {
      this.loaderService.hide();
    }
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!this.isUploadRequest(req)) {
      this.requests.push(req);
      this.loaderService.show();
    }

    return next.handle(req).pipe(
      finalize(() => {
        this.removeRequest(req);
      })
    );
  }
}
