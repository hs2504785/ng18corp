import { ErrorHandler, Injectable, Injector, isDevMode } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '@gale/shared/services/src';
import { ToastService } from '@gale/shared/ui/src/lib/components/toast/toast.service';

@Injectable()
export class GlobalErrorHandler extends ErrorHandler {
  constructor(private injector: Injector) {
    super();
  }

  override handleError(error: Error | HttpErrorResponse) {
    const errorService = this.injector.get(ErrorService);
    // const logger = this.injector.get(LoggingService);
    const notifier = this.injector.get(ToastService);

    let message;
    // let stackTrace;
    if (error instanceof HttpErrorResponse) {
      // Server error
      // Already catched
      // message = errorService.getServerErrorMessage(error);
      //stackTrace = errorService.getServerErrorStackTrace(error);
    } else {
      // Client Error
      message = error && errorService.getClientErrorMessage(error);
    }

    // Always log errors
    // logger.logError(message, stackTrace);

    // Let's not supress console error as it helps dev a lot
    if (isDevMode() && error && message) {
      // Notify Error
      notifier.error(message);
      super.handleError(error);
    }
  }
}
