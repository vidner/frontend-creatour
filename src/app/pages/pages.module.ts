import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule ,ReactiveFormsModule} from "@angular/forms";
import { RouterModule } from "@angular/router";
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ProgressbarModule } from "ngx-bootstrap/progressbar";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { CollapseModule } from "ngx-bootstrap/collapse";
import { TabsModule } from "ngx-bootstrap/tabs";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { AlertModule } from "ngx-bootstrap/alert";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { CarouselModule } from "ngx-bootstrap/carousel";
import { ModalModule } from "ngx-bootstrap/modal";
import { JwBootstrapSwitchNg2Module } from "jw-bootstrap-switch-ng2";
import { PopoverModule } from "ngx-bootstrap/popover";


import { IndexComponent } from "./index/index.component";
import { ProfilepageComponent } from "./profilepage/profilepage.component";
import { RegisterpageComponent } from "./registerpage/registerpage.component";
import { LandingpageComponent } from "./landingpage/landingpage.component";
import { LoginpageComponent } from "./loginpage/loginpage.component";
import { ProjectpageComponent } from "./projectpage/projectpage.component";
import { ProjectdetailpageComponent } from "./projectdetailpage/projectdetailpage.component";


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    PopoverModule.forRoot(),
    CollapseModule.forRoot(),
    JwBootstrapSwitchNg2Module,
    TabsModule.forRoot(),
    PaginationModule.forRoot(),
    AlertModule.forRoot(),
    BsDatepickerModule.forRoot(),
    CarouselModule.forRoot(),
    ModalModule.forRoot()
  ],
  declarations: [
    IndexComponent,
    ProfilepageComponent,
    RegisterpageComponent,
    LandingpageComponent,
    LoginpageComponent,
    ProjectpageComponent,
    ProjectdetailpageComponent
  ],
  exports: [
    IndexComponent,
    ProfilepageComponent,
    RegisterpageComponent,
    LandingpageComponent,
    LoginpageComponent,
    ProjectpageComponent,
    ProjectdetailpageComponent
  ],
  providers: [ ]
})
export class PagesModule {}
