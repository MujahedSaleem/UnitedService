import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { APP_CONFIG } from '../../../configs/app.config';
import { ProgressBarService } from '../../../core/services/progress-bar.service';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { UserAuthService } from 'src/app/core/services/user-auth.service';
import { User } from 'src/app/modules/users/shared/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  selectedLanguage: string;
  progressBarMode: string;
  currentUrl: string;
  user: User;
  languages: any[];
  currentState: boolean;
  constructor(@Inject(APP_CONFIG) public appConfig: any,
    private progressBarService: ProgressBarService,
    private router: Router,
    private userAuth: UserAuthService,
    private activatedRoute: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object) {
    this.languages = [{ name: 'en', label: 'English' }, { name: 'es', label: 'Español' }];
  }

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      this.user = JSON.parse(localStorage.getItem('user'));
    }
    if (isPlatformBrowser(this.platformId)) {
      this.selectedLanguage = localStorage.getItem('language') || 'en';
    }

    this.progressBarService.updateProgressBar$.subscribe((mode: string) => {
      this.progressBarMode = mode;
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
      }
    });
    if (this.userAuth.isUserSignedIn()) {
      this.currentState = false
    }

  }

  changeLanguage(language: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('language', language);
    }
    this.selectedLanguage = language;
  }
  signOut() {
    if (!this.userAuth.isUserSignedIn()) {
      this.userAuth.SignOut();
      this.currentState = true;
    }
  }
  signIn() {
this.router.navigate(['/auth/login'])
  }
}
