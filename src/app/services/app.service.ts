import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http : HttpClient) { }

  //Put request to server with user id and application data
  createApplication(id,app): Observable<any>{
    return this.http.put("http://localhost:8081/account/application/" + id , app);
  }
}
