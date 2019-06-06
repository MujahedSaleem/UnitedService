import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostDetailPageComponent } from './pages/post-detail-page/post-detail-page.component';
import { PostCreatePageComponent } from './pages/post-create-page/post-create-page.component';
import { AuthGuard } from 'src/app/core/guard/auth.guard';
import { AppConfig } from 'src/app/configs/app.config';
import { AppRoutingModule } from 'src/app/app-routing.module';

const routes: Routes = [

    {
        path: ':id', component: PostDetailPageComponent
    },

    {
        path: '**', component: PostCreatePageComponent, runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
    }


]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PostRoutingModule { }