import {ErrorHandler, Injectable} from "@angular/core";
import * as Sentry from "@sentry/browser";
import {AppConfig} from "../configs/app.config";

Sentry.init({
  dsn: AppConfig.sentryDSN,
});

@Injectable()
export class SentryErrorHandler implements ErrorHandler {
  constructor() {
  }

  public handleError(error) {
    console.log(error);
    Sentry.captureException(error.originalError || error);
    throw error;
  }
}
