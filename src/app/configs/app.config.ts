import { InjectionToken } from '@angular/core';

export let APP_CONFIG = new InjectionToken('app.config');

export const AppConfig: any = {
  routes: {
    createService: 'createService',
    error404: '404',
    posts: 'posts',
    users: 'users',
    message: 'messages',
    auth: 'auth'
  },
  votesLimit: 3,
  topHeroesLimit: 10,
  snackBarDuration: 3000,
  repositoryURL: 'https://github.com/MujahedSaleem/UnitedService.git',
  sentryDSN: 'https://38434a1b115f41d3a31e356cdc496c06@sentry.io/1315526'
};
