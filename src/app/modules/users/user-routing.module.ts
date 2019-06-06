import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { AppConfig } from "src/app/configs/app.config";
import { AuthGuard } from "src/app/core/guard/auth.guard";
import { HeroLoadingComponent } from "src/app/shared/components/hero-loading/hero-loading.component";
import { MaterialModule } from "src/app/shared/modules/material.module";
import { MemberCardComponent } from "./components/member-Card/member-Card.component";
import { DetailUserPageComponent } from "./pages/detail-user-page/detail-user-page.component";
import { EditUserPageComponent } from "./pages/edit-user-page/edit-user-page.component";

const routes: Routes = [{
    path: "", component: DetailUserPageComponent, pathMatch: "full",
},
{
    path: "edit", component: EditUserPageComponent , runGuardsAndResolvers: "always",
    canActivate: [AuthGuard],
},

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],

})
export class UserRoutingModule { }
