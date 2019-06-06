import { Component, Inject, LOCALE_ID, OnInit, PLATFORM_ID, Renderer2 } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AppConfig } from './configs/app.config';
import { UtilsHelperService } from './core/services/utils-helper.service';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { I18n } from '@ngx-translate/i18n-polyfill';
import { PresenceService } from './core/services/presence.service';
import { SwPush } from '@angular/service-worker';
import * as firebase from 'firebase';

declare const Modernizr;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {

  isOnline: boolean;
  opened: boolean;
  constructor(private title: Title,
    private meta: Meta,
    private snackBar: MatSnackBar,
    
    private router: Router,
    swPush: SwPush,
    public presence: PresenceService,
    private i18n: I18n,
    @Inject(DOCUMENT) doc: Document, @Inject(LOCALE_ID) locale: string, renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object) {
    if (swPush.isEnabled) {
      navigator.serviceWorker
        .ready
        .then((registration) => firebase.messaging().useServiceWorker(registration));
    }
    if (isPlatformBrowser(this.platformId)) {
      this.isOnline = navigator.onLine;
      renderer.setAttribute(doc.documentElement, 'lang', locale);
    } else {
      this.isOnline = true;
    }
  }

  ngOnInit() {
    this.title.setTitle('united Scoial');

    this.onEvents();
    this.checkBrowser();
  }

  onEvents() {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        switch (event.urlAfterRedirects) {
          case '/':
            this.meta.updateTag({
              name: 'description',
              content: this.i18n({ value: 'Home meta description', id: '@@homeMetaDescription' })
            });
            break;
          case '/' + AppConfig.routes.heroes:
            this.title.setTitle('Heroes list');
            this.meta.updateTag({
              name: 'description',
              content: this.i18n({ value: 'Heroes meta description', id: '@@heroesMetaDescription' })
            });
            break;
        }
      }
    });
  }

  checkBrowser() {
    if (isPlatformBrowser(this.platformId)) {
      if (UtilsHelperService.isBrowserValid()) {
        this.checkBrowserFeatures();
      } else {
        this.snackBar.open(this.i18n({ value: 'Change your browser', id: '@@changeBrowser' }), 'OK');
      }
    }
  }

  checkBrowserFeatures() {
    let supported = true;
    for (const feature in Modernizr) {
      if (Modernizr.hasOwnProperty(feature) &&
        typeof Modernizr[feature] === 'boolean' && Modernizr[feature] === false) {
        supported = false;
        break;
      }
    }

    if (!supported) {
      this.snackBar.open(this.i18n({ value: 'Update your browser', id: '@@updateBrowser' }), 'OK');
    }

    return supported;
  }
}
