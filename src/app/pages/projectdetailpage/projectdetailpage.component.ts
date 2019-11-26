import { Component, OnInit, OnDestroy } from "@angular/core";

import { ProjectService } from "../../_services/project.service";


import { switchMap } from 'rxjs/operators';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: "app-projectdetailpage",
  templateUrl: "projectdetailpage.component.html"
})
export class ProjectdetailpageComponent implements OnInit, OnDestroy {
  isCollapsed = true;
  project: any={};
  recentProjects: any=[];
  totalProject: number;
  totalContributor: number;
  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.projectService.getProjects()
        .subscribe(projects => {
          this.recentProjects = projects.data.slice(0,4);
          this.totalProject = projects.data.length;
        });

    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
       return this.projectService.getProjectById(+params.get('projectId'));
     })).subscribe(project => {this.project = project.data; console.log(this.project)});

    var body = document.getElementsByTagName("body")[0];
    body.classList.add("profile-page");
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("profile-page");
  }
}
