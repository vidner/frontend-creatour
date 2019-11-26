import {Component, OnInit, OnDestroy, Inject} from '@angular/core';

import {ProjectService} from '../../_services/project.service';


import {switchMap} from 'rxjs/operators';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import {User} from '../../_models/user';
import {AuthenticationService} from '../../_services/authentication.service';
import {DOCUMENT} from '@angular/common';

@Component({
    selector: 'app-projectdetailpage',
    templateUrl: 'projectdetailpage.component.html'
})
export class ProjectdetailpageComponent implements OnInit, OnDestroy {
    isCollapsed = true;
    project: any = {};
    recentProjects: any = [];
    totalProject: number;
    currentUser: User;
    members = false;

    constructor(
        private authenticationService: AuthenticationService,
        private projectService: ProjectService,
        private route: ActivatedRoute,
        private router: Router,
        @Inject(DOCUMENT) document
    ) {
        this.authenticationService.currentUser.subscribe(user => this.currentUser = user);
    }

    ngOnInit() {
        this.projectService.getProjects()
            .subscribe(projects => {
                this.recentProjects = projects.data.slice(0, 4);
                this.totalProject = projects.data.length;
            });

        this.route.paramMap.pipe(
            switchMap((params: ParamMap) => {
                return this.projectService.getProjectById(+params.get('projectId'));
            })).subscribe(project => {
            this.project = project.data;
            console.log(this.project);

            const check = this.project.ProjectMembers.find(x => x.userId == this.currentUser.user.id);
            if (check !== null) {
                this.members = true;
            }

            console.log(this.members);
            // console.log(this.currentUser.user.id);
        });
        var body = document.getElementsByTagName('body')[0];
        body.classList.add('profile-page');
    }

    ngOnDestroy() {
        var body = document.getElementsByTagName('body')[0];
        body.classList.remove('profile-page');
    }
}
