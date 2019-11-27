import { Component, OnInit, OnDestroy, HostListener } from "@angular/core";
import {Router, ActivatedRoute} from '@angular/router';
import {Form, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';

import {User} from '../../_models/user';
import {AuthenticationService} from '../../_services/authentication.service';
import {UserService} from '../../_services/user.service';

@Component({
  selector: "app-editprofilepage",
  templateUrl: "editprofilepage.component.html"
})
export class EditprofilepageComponent implements OnInit  {

  currentUser: User;
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  profilePicture: File;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) {
    this.authenticationService.currentUser.subscribe(user => this.currentUser = user);
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', Validators.required]
    });
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    this.loading = true;
    this.authenticationService.register(this.f.username.value, this.f.password.value,this.f.name.value, this.f.email.value)
        .pipe(first())
        .subscribe(
            data => {
                this.router.navigate(['/editprofile']);
            },
            error => {
                this.error = error;
                this.loading = false;
            });
      }

    onFileChanged(event) {
      this.profilePicture = event.target.files[0]
    }

    onUpload() {
      const profilePicture = new FormData();
      profilePicture.append('profile', this.profilePicture, this.profilePicture.name);
      console.log(this.profilePicture);
      this.userService.uploadProfilePicture(profilePicture)
        .subscribe(status => {
          console.log(status);
        })
    }
}
