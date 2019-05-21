import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './Auth-routing.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { RegisterPageComponent } from './pages/register-page/register-page.component';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { LoginComponent } from './pages/login/login.component';
@NgModule({
    imports: [AuthRoutingModule, RouterModule, CommonModule, FormsModule, SharedModule,
        ReactiveFormsModule,
        MDBBootstrapModule],
    exports: [],
    declarations: [RegisterPageComponent, LoginComponent],
    providers: [],
})
export class AuthModule { }
