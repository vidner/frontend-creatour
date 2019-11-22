import { Component, OnInit, OnDestroy, HostListener } from "@angular/core";
import {Router, ActivatedRoute} from '@angular/router';
import {Form, FormBuilder, FormGroup, Validators, FormArray, FormControl} from '@angular/forms';
import {first} from 'rxjs/operators';

import {ProjectService} from '../../_services/project.service';

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

  // List categories: ['Game', 'Web', 'Software', 'Browser Game', 'Mobile Apps', 'Mobile Game']
  // Hardcode dulu, ntar coba bikin GET categories di backend
  categories = [
    {id: "Game", name: "Game"},
    {id: "Web", name: "Web"},
    {id: "Software", name: "Software"},
    {id: "Browser Game", name: "Browser Game"},
    {id: "Mobile Apps", name: "Mobile Apps"},
    {id: "Mobile Game", name: "Mobile Game"}
  ];

  constructor(
    private projectService: ProjectService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.projectForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      category: new FormArray([])
    });
    this.addCheckboxes();
  }

  get f() { return this.projectForm.controls; }

  addCheckboxes() {
      this.categories.forEach((o, i) => {
        const control = new FormControl(i === 0); // if first item set to true, else false
        (this.projectForm.controls.category as FormArray).push(control);
      });
  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit

    // stop here if form is invalid
    if (this.projectForm.invalid) {
        return;
    }

    this.loading = true;

    const selectedCategory = this.projectForm.value.category
      .map((v, i) => v ? this.categories[i].id : null)
      .filter(v => v !== null);

    // TODO: roleList -> Form input untuk role-role yang dibutuhkan dalam project
    let newProject = {
      "name": this.f.name.value,
      "description": this.f.description.value,
      "category": selectedCategory,
      "roleList": [1, 2, 3]
    }

    this.projectService.createProject(newProject)
      .subscribe(
        data => {
          this.loading = false;
        },
        error => {
          this.error = error;
          this.loading = false;
        });
    }
}
