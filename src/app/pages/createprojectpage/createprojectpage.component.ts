import { Component, OnInit, OnDestroy, HostListener } from "@angular/core";
import {Router, ActivatedRoute} from '@angular/router';
import {Form, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';

import {ProjectService} from '../../_services/authentication.service';

@Component({
  selector: "app-createprojectpage",
  templateUrl: "createprojectpage.component.html"
})
export class CreateprojectpageComponent implements OnInit  {


  projectForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  get f() { return this.projectForm.controls; }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit

    // stop here if form is invalid
    if (this.projectForm.invalid) {
        return;
    }

    this.loading = true;
    console.log(this.f);
    // this.authenticationService.register(this.f.username.value, this.f.password.value,this.f.name.value, this.f.email.value)
    //     .pipe(first())
    //     .subscribe(
    //         data => {
    //             this.router.navigate(['/login']);
    //         },
    //         error => {
    //             this.error = error;
    //             this.loading = false;
    //         });
    }
}
