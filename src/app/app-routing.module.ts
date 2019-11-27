import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from './_guards/auth.guard';

import { IndexComponent } from "./pages/index/index.component";
import { ProfilepageComponent } from "./pages/profilepage/profilepage.component";
import { RegisterpageComponent } from "./pages/registerpage/registerpage.component";
import { LandingpageComponent } from "./pages/landingpage/landingpage.component";
import { LoginpageComponent } from "./pages/loginpage/loginpage.component";
import { ProjectpageComponent } from "./pages/projectpage/projectpage.component";
import { ProjectdetailpageComponent } from "./pages/projectdetailpage/projectdetailpage.component";
import { CreateprojectpageComponent } from "./pages/createprojectpage/createprojectpage.component";
import {MyprojectpageComponent} from './pages/myprojectpage/myprojectpage.component';
import {ProjectmanagepageComponent} from './pages/projectmanagepage/projectmanagepage.component';
import {EditprofilepageComponent} from './pages/editprofilepage/editprofilepage.component';

// TO DO: Implementasi AuthGuard
const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "landing", component: IndexComponent },
  { path: "profile", component: ProfilepageComponent },
  { path: "register", component: RegisterpageComponent },
  { path: "home", component: LandingpageComponent },
  { path: "login", component: LoginpageComponent },
  { path: "projects", component: ProjectpageComponent },
  { path: "project/:projectId", component: ProjectdetailpageComponent },
  { path: "me", component: CreateprojectpageComponent, canActivate: [AuthGuard]},
  { path: "manage/:projectId", component: ProjectmanagepageComponent, canActivate: [AuthGuard]},
  { path: "editprofile", component: EditprofilepageComponent}
  // { path: "myprojects", component: MyprojectpageComponent}
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: []
})
export class AppRoutingModule {}
