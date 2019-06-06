import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import { HomePageComponent } from './shared/pages/home-page/home-page.component';
import { AppConfig } from './configs/app.config';
import { AuthGuard } from './core/guard/auth.guard';
import { LoggedInGuard } from 'ngx-auth-firebaseui';
const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: '', component: HomePageComponent },
  { path: '*', redirectTo: '', pathMatch: 'full' },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [LoggedInGuard ,AuthGuard],
    children: [
     
      { path: AppConfig.routes.message, loadChildren: './modules/messages/chat.module#ChatModule' },
      { path: AppConfig.routes.posts, loadChildren: './modules/posts/post.module#PostModule' },
      { path: AppConfig.routes.error404, component: Error404PageComponent },
      { path: ':id', loadChildren: './modules/users/user.module#UsereModule' },
      { path: '**', redirectTo: '/' + AppConfig.routes.error404 },
      { path: 'en', redirectTo: '' }, // because english language is the default one
    ]
  },  { path: '**', redirectTo: '/' + AppConfig.routes.error404 },


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
