import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: RegisterPageComponent }
  ]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    declarations: [],
})
export class AuthRoutingModule { }