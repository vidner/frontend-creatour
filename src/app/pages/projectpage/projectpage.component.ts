import { Component ,OnInit, OnDestroy} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import Chart from "chart.js";

@Component({
  selector: "app-projectpage",
  templateUrl: "projectpage.component.html"
})
export class ProjectpageComponent    {
  projects: any ;
  constructor(private http: HttpClient) {
    this.projects = [];
  }
  ngOnInit(){
  const url ='http://localhost:8888/api/projects'
  this.http.get(url).subscribe((res)=>{
    this.projects = res
    console.log(this.data)
  })
  }
  
}
