import { Component ,OnInit, OnDestroy} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';
import Chart from "chart.js";

import { ProjectService } from "../../_services/project.service";

@Component({
  selector: "app-projectpage",
  templateUrl: "projectpage.component.html"
})
export class ProjectpageComponent    {
  projects: any;
  constructor(private http: HttpClient, private projectService: ProjectService) {
    this.projects = [];
  }
  ngOnInit(){
    this.projectService.getProjects()
      .pipe(map(projects => projects.data.map(project => ({
            id: project.id,
            description: project.description,
            name: project.name,
            count: project.ProjectMembers.length,
            ProjectMembers: project.ProjectMembers,
            ProjectCategories: project.ProjectCategories,
            filled: project.ProjectMembers.filter(obj=>!Object.values(obj).includes(null)).length
          }))))
      .subscribe(projects => {
        this.projects = projects;
        console.log(this.projects);
      });
  }

}
