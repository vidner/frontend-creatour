import {
  Component,
  OnInit,
  Renderer,
  HostListener,
  Inject
} from "@angular/core";
import { Location } from "@angular/common";
import { DOCUMENT } from "@angular/common";
import { Router } from '@angular/router';

import { AuthenticationService } from './_services/authentication.service';

import { User } from './_models/user';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  currentUser: User;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private renderer: Renderer,
    public location: Location,
    @Inject(DOCUMENT) document
  ) {
    this.authenticationService.currentUser.subscribe(user => this.currentUser = user);
  }
  @HostListener("window:scroll", ["$event"])
  onWindowScroll(e) {
    if (window.pageYOffset > 100) {
      var element = document.getElementById("navbar-top");
      if (element) {
        element.classList.remove("navbar-transparent");
        element.classList.add("bg-danger");
      }
    } else {
      var element = document.getElementById("navbar-top");
      if (element) {
        element.classList.add("navbar-transparent");
        element.classList.remove("bg-danger");
      }
    }
  }
  ngOnInit() {
    this.onWindowScroll(event);
  }

  logout(){
    this.authenticationService.logout();
    this.router.navigate(['']);
  }
}
