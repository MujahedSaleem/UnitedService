import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditUserPageComponent } from './pages/edit-user-page/edit-user-page.component';
import { MemberCardComponent } from './components/member-Card/member-Card.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { HeroLoadingComponent } from 'src/app/shared/components/hero-loading/hero-loading.component';

const routes: Routes = [{
    path: '', component: EditUserPageComponent,pathMatch: 'full' 
}]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
   
})
export class UserRoutingModule { }