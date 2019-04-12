import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppConfig } from 'src/app/configs/app.config';
import { MessagePageComponent } from './pages/message-page/message-page.component';

const routes: Routes = [
    { path: '', component: MessagePageComponent, pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [],
    declarations: [],
})
export class MessageRouteModule { }