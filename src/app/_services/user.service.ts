import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public API_URL:string = 'http://localhost:8888';

  constructor(
    private http: HttpClient
  ) { }
  getProjects(): Observable<any>{
    return this.http.get(this.API_URL+'/api/projects');
  }

  getUsers(): Observable<any>{
    return this.http.get(this.API_URL+'/api/users');
  }

  uploadProfilePicture(profilePicture): Observable<any>{
    return this.http.post(this.API_URL+'/api/users/upload', profilePicture);
  }
}
