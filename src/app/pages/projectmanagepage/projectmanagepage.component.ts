import {Component, OnInit, OnDestroy, Inject} from '@angular/core';

import {ProjectService} from '../../_services/project.service';


import {switchMap} from 'rxjs/operators';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import {User} from '../../_models/user';
import {AuthenticationService} from '../../_services/authentication.service';
import {DOCUMENT} from '@angular/common';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-projectdetailpage',
    templateUrl: 'projectmanagepage.component.html'
})
export class ProjectmanagepageComponent implements OnInit, OnDestroy {
    isCollapsed = true;
    project: any = {};
    recentProjects: any = [];
    totalProject: number;
    loading: false;
    currentUser: User;
    members = false;
    projectForm: FormGroup;
    rolesExist = [];
    rolesAvail: any = [];

    constructor(
        private authenticationService: AuthenticationService,
        private projectService: ProjectService,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private router: Router,
        @Inject(DOCUMENT) document
    ) {
        this.authenticationService.currentUser.subscribe(user => this.currentUser = user);
    }

    get f() { return this.projectForm.controls; }

    ngOnInit() {
        this.projectService.getProjects()
            .subscribe(projects => {
                this.recentProjects = projects.data.slice(0, 4);
                this.totalProject = projects.data.length;
            });

        this.projectForm = this.formBuilder.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
            github: [''],
            trello: [''],
            slack: [''],
        });

        this.route.paramMap.pipe(
            switchMap((params: ParamMap) => {
                return this.projectService.getProjectById(+params.get('projectId'));
            })).subscribe(project => {
            this.project = project.data;

            if (this.currentUser) {
                // @ts-ignore
                const check = this.project.ProjectMembers.find(x => x.userId === this.currentUser.user.id);
                // console.log(check);
                if (check !== undefined) {
                    this.members = true;
                }
            }
            // console.log(this.roles);
            var roles = [
                { id: 0, role:"Marketing"},
                { id: 1, role:"Web Developer"},
                { id: 2, role:"Web Designer"},
                { id: 3, role:"2D Artist"}
            ]
            var empty = [];
            console.log(project);
            roles.forEach(function(val){
                const check = project.data.ProjectMembers.find(x => x.role === val.id);
                console.log(check);
                if (check === undefined){
                    empty.push(val);
                }
            });
            this.rolesAvail = empty;
            this.projectForm.controls['name'].setValue(this.project.name);
            this.projectForm.controls['description'].setValue(this.project.description);
            this.projectForm.controls['github'].setValue(this.project.github);
            this.projectForm.controls['slack'].setValue(this.project.slack);
            this.projectForm.controls['trello'].setValue(this.project.trello);

            // console.log(this.members);
            // console.log(this.currentUser.user.id);
        });

        // console.log(this.project);

        var body = document.getElementsByTagName('body')[0];
        body.classList.add('profile-page');
    }

    ngOnDestroy() {
        var body = document.getElementsByTagName('body')[0];
        body.classList.remove('profile-page');
    }

    onSubmit() {
        console.log("test");
        // this.submitted = true;

        // reset alerts on submit
        //
        // // stop here if form is invalid
        // if (this.projectForm.invalid) {
        //     return;
        // }

        // this.loading = true;


        // const selectedCategory = this.projectForm.value.category
        //     .map((v, i) => v ? this.categories[i].id : null)
        //     .filter(v => v !== null);
        //
        // const selectedRole = this.projectForm.value.role
        //     .map((v, i) => v ? this.roles[i].id : null)
        //     .filter(v => v !== null);

        // TODO: roleList -> Form input untuk role-role yang dibutuhkan dalam project
        let updatedProject = {
            "name": this.f.name.value,
            "description": this.f.description.value,
            "trelloLink": this.f.trello.value,
            "githubLink": this.f.github.value,
            "slackLink": this.f.slack.value
        }

        let projectId = this.route.snapshot.paramMap.get('projectId');

        this.projectService.updateProjectById(projectId, updatedProject)
            .subscribe(
                data => {
                    console.log(data);
                    window.location.reload();
                },
                error => {
                    // this.error = error;
                    // this.loading = false;
                });
    }

    newRole(){

    }

    delRole(id){
        this.projectService.deleteRole(id)
            .subscribe(data => {
                this.loading = false;
                window.location.reload();
            });
    }

}
