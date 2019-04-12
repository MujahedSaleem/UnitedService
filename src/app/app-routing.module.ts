import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import { HomePageComponent } from './shared/pages/home-page/home-page.component';
import { AppConfig } from './configs/app.config';
import { AuthGuard } from './core/guard/auth.guard';

const routes: Routes = [
  { path: '', component: HomePageComponent, pathMatch: 'full' },
  { path: AppConfig.routes.heroes, loadChildren: './modules/heroes/heroes.module#ServicesModule' },
  { path: AppConfig.routes.posts, loadChildren: './modules/posts/post.module#PostModule' },
  { path: AppConfig.routes.message, loadChildren: './modules/messages/message.module#MessageModule' },
  { path: AppConfig.routes.auth, loadChildren: './modules/Auth/Auth.module#AuthModule' },
  { path: AppConfig.routes.error404, component: Error404PageComponent },
  { path: ':id', loadChildren: './modules/users/user.module#UsereModule' , canActivate: [AuthGuard]},
  { path: '**', redirectTo: '/' + AppConfig.routes.error404 },

  { path: 'en', redirectTo: '' }, // because english language is the default one

  // otherwise redirect to 404
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled'
    })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
