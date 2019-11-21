import { Component ,OnInit, OnDestroy} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import Chart from "chart.js";

import { ProjectService } from "../../_services/project.service";

@Component({
  selector: "app-projectpage",
  templateUrl: "projectpage.component.html"
})
export class ProjectpageComponent    {
  projects: any ;
  constructor(private http: HttpClient, private projectService: ProjectService) {
    this.projects = [];
  }
  ngOnInit(){
    this.projectService.getProjects()
      .subscribe(projects => {
        this.projects = projects;
        console.log(this.projects);
      });
  }

}
