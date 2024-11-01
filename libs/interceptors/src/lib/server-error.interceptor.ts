import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError as observableThrowError, throwError } from 'rxjs';
import { ToastService } from '@gale/shared/ui/src/lib/components/toast/toast.service';
import { catchError, filter, finalize, switchMap, take } from 'rxjs/operators';
import { AuthService } from '@gale/auth/data-access/src';
import { Injectable, inject } from '@angular/core';

@Injectable()
export class ServerErrorInterceptor implements HttpInterceptor {
  isRefreshingToken = false;
  private authService = inject(AuthService);
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  constructor(private toastService: ToastService) {}

  addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    // tslint:disable-next-line:max-line-length
    return req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + token,
        'X-Timezone-Offset': new Date().getTimezoneOffset().toString(),
      },
    });
  }

  handleServerError(error: any, req: any, next: any) {
    let errMsg = '';
    switch (error.status) {
      case 401: {
        if (error.error.errors[0].msg === 'Authentication Failed' || error.error.errors[0].msg === 'invalid access token') {
          this.authService.destroyToken();
          this.authService.redirectToLogin();
        } else if (error.error.errors[0].msg === 'TOKEN_EXPIRED' || error.error.errors[0].msg === 'token expired') {
          this.handle401TokenExpiredError(req, next);
        } else {
          return observableThrowError(error);
        }
        break;
      }
      case 404: {
        errMsg = 'Requested Resource Not Found';
        break;
      }
      case 403: {
        errMsg = 'Access Denied';
        break;
      }
      case 500: {
        errMsg = 'Internal Server Error';
        break;
      }
      case 502: {
        errMsg = 'Bad Gateway';
        break;
      }
      case 504: {
        errMsg = 'Gateway Time-out';
        break;
      }
      default: {
        errMsg = error.error?.errors ? `${error['error']['errors'][0].msg}` : `${error.statusText}`;
      }
    }

    if (errMsg) {
      this.toastService.error(errMsg);
    }
    return throwError(() => error);
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const shouldSkipGlobalErrorHandling = req.params.get(
      'skipGlobalErrorHandling',
    );
    // Remove the custom parameter before sending the request to the server
    if (shouldSkipGlobalErrorHandling) {
      req = req.clone({ params: req.params.delete('skipGlobalErrorHandling') });
    }

    return next.handle(req).pipe(
      // retry(2),
      catchError((err: HttpErrorResponse) => {
        if (shouldSkipGlobalErrorHandling || req.url.indexOf('skipGlobalToast=true') >= 0) {
          // Skip global error handling
          return throwError(() => err);
        }

        if (err.error instanceof ErrorEvent) {
          // Client Side Http Error
          return throwError(() => err);
        } else {
          // Server Side Http Error
          return this.handleServerError(err, req, next);
        }
      }),
    );
  }

  handle401TokenExpiredError(req: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;
      // Reset here so that the following requests wait until the token
      // comes back from the refreshToken call.
      this.tokenSubject.next('');
      let refresh_token: any = this.authService.refreshToken();
      return refresh_token.pipe(
        switchMap((refreshData: any) => {
          if (refreshData) {
            this.authService.updateAuthInfoWithRefreshTokenResponse(
              refreshData,
            );
            const newToken = refreshData.authorization.accessToken;
            this.tokenSubject.next(newToken);
            return next.handle(this.addToken(req, newToken));
          }
          // If we don't get a new token, we are in trouble so logout.
          return this.logoutUser();
        }),
        catchError((error) => {
          // If there is an exception calling 'refreshToken', bad news so logout.
          return this.logoutUser();
        }),
        finalize(() => {
          this.isRefreshingToken = false;
        }),
      );
    } else {
      return this.tokenSubject.pipe(
        filter((token) => token != null),
        take(1),
        switchMap((token) => {
          return next.handle(this.addToken(req, token));
        }),
      );
    }
  }

  logoutUser() {
    // Route to the login page
    this.authService.destroyToken();
    this.authService.redirectToLogin();
    return observableThrowError('');
  }
}
