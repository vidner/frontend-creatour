import { Component, OnInit, OnDestroy, HostListener } from "@angular/core";
import {Router, ActivatedRoute} from '@angular/router';
import {Form, FormBuilder, FormGroup, Validators, FormArray, FormControl} from '@angular/forms';
import {first, map} from 'rxjs/operators';

import {ProjectService} from '../../_services/project.service';
import {User} from '../../_models/user';
import {AuthenticationService} from '../../_services/authentication.service';

@Component({
  selector: "app-createprojectpage",
  templateUrl: "createprojectpage.component.html"
})
export class CreateprojectpageComponent implements OnInit  {
  currentUser: User;
  projectForm: FormGroup;
  myProjects: any;
  joinedProjects: any;
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

  roles = [
    { id: 0, role:"Marketing"},
    { id: 1, role:"Web Developer"},
    { id: 2, role:"Web Designer"},
    { id: 3, role:"2D Artist"}
    // { id: 4, role:"3D Artist"},
    // { id: 5, role:"Unity Programer"},
    // { id: 6, role:"Game Designer"},
    // { id: 7, role:"C# Programmer"},
    // { id: 8, role:"iOS Developer"},
    // { id: 9, role:"Android Developer"},
    // { id: 10, role:"Social Media Manager"}
  ]

  constructor(
    private projectService: ProjectService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
  ) {
    this.authenticationService.currentUser.subscribe(user => this.currentUser = user);
    this.myProjects = [];
    this.joinedProjects = [];
  }

  ngOnInit() {
    // console.log(this.currentUser);

    this.projectForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      category: new FormArray([]),
      role: new FormArray([])
    });
    this.addCheckboxes();

    this.projectService.getMyProject()
        .pipe(map(projects => projects.data.map(project => ({
          id: project.id,
          description: project.description,
          name: project.name,
          count: project.ProjectMembers.length,
          ProjectMembers: project.ProjectMembers,
          ProjectCategories: project.ProjectCategories,
          filled: project.ProjectMembers.filter(obj => !Object.values(obj).includes(null)).length
        }))))
        .subscribe(projects => {
          this.myProjects = projects;
          console.log(this.myProjects);
        });

    this.projectService.getJoinedProject()
        .pipe(map(projects => projects.data.map(project => ({
          id: project.id,
          description: project.description,
          name: project.name,
          count: project.ProjectMembers.length,
          ProjectMembers: project.ProjectMembers,
          ProjectCategories: project.ProjectCategories,
          filled: project.ProjectMembers.filter(obj => !Object.values(obj).includes(null)).length
        }))))
        .subscribe(projects => {
          this.joinedProjects = projects;
          console.log(this.joinedProjects);
        });
  }

  get f() { return this.projectForm.controls; }

  addCheckboxes() {
      this.categories.forEach((o, i) => {
        const category = new FormControl(i === 0); // if first item set to true, else false
        (this.projectForm.controls.category as FormArray).push(category);
      });

      this.roles.forEach((o, i) => {
        const role = new FormControl(i === 0);
        (this.projectForm.controls.role as FormArray).push(role);
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

    const selectedRole = this.projectForm.value.role
      .map((v, i) => v ? this.roles[i].id : null)
      .filter(v => v !== null);

    // TODO: roleList -> Form input untuk role-role yang dibutuhkan dalam project
    let newProject = {
      "name": this.f.name.value,
      "description": this.f.description.value,
      "category": selectedCategory,
      "roleList": selectedRole
    }
    this.projectService.createProject(newProject)
      .subscribe(
        data => {
          this.loading = false;
          window.location.reload();
        },
        error => {
          this.error = error;
          this.loading = false;
        });
    }

    delete(id){
      this.projectService.deleteProject(id)
          .subscribe( data => {
              this.loading = false;
              window.location.reload();
          });
      //   this.router.navigate(['assets/muka.png']);
    }

}
