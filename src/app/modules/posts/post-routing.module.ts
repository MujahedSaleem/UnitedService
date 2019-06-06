import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppRoutingModule } from "src/app/app-routing.module";
import { AppConfig } from "src/app/configs/app.config";
import { AuthGuard } from "src/app/core/guard/auth.guard";
import { PostCreatePageComponent } from "./pages/post-create-page/post-create-page.component";
import { PostDetailPageComponent } from "./pages/post-detail-page/post-detail-page.component";

const routes: Routes = [

    {
        path: ":id", component: PostDetailPageComponent,
    },

    {
        path: "**", component: PostCreatePageComponent, runGuardsAndResolvers: "always",
        canActivate: [AuthGuard],
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PostRoutingModule { }
