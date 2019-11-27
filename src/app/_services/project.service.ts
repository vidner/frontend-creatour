import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  public API_URL:string = 'http://localhost:8888';

  constructor(
    private http: HttpClient
  ) {}

  // Get all projects
  // GET /api/projects
  getProjects(): Observable<any>{
    return this.http.get(this.API_URL+'/api/projects');
  }

  // Get project by project id
  // GET /api/projects/:id
  getProjectById(projectId: number): Observable<any>{
    return this.http.get(this.API_URL+'/api/projects/'+projectId);
  }

  // Create new project
  // POST /api/projects
  createProject(newProject): Observable<any>{
    return this.http.post(this.API_URL+'/api/projects/', newProject);
  }

  getMyProject(): Observable<any>{
    return this.http.get(this.API_URL+'/api/projects/my/projects');
  }

  joinProjectById(roleId: number, projectId: number): Observable<any>{
    return this.http.post(this.API_URL+`/api/projects/${projectId}/join`);
  }

}
