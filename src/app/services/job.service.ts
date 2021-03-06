import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Job } from '../models/job';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private http : HttpClient, private userService: UserService) { }

  private job = new Job();

  setJob(job){
    
    this.job.owner = this.userService.getUser()._id;
    this.job.type = job.type;
    this.job.description = job.description;
    console.log(this.job);
  }

  setJobApplicants(applicants){
    this.job.applicants = applicants;
  }

  getJob(){
    return this.job;
  }

  getUserJobs(): Observable<any>{
    return this.http.get("http://localhost:8081/jobs/getjob/" + this.userService.getUser()._id);
  }
  
  getAllJobs(): Observable<any>{
    return this.http.get("http://localhost:8081/jobs/getjob");
  }

  getAppliedForJobs(): Observable<any>{
    return this.http.get("http://localhost:8081/jobs/jobsappliedfor/"+this.userService.getUser()._id);
  }

  postJob(job): Observable<any>{
    job.email =  this.userService.getUser().email;
    return this.http.post("http://localhost:8081/jobs/postjob", job);
  }

  deleteJob(jobID): Observable<any>{
    return this.http.delete("http://localhost:8081/jobs/deletejob/" + jobID);
  }

  applyForJob(job): Observable<any>{
    console.log(job);
    return this.http.post("http://localhost:8081/jobs/applyforjob/"+this.userService.getUser()._id, job);
  }
}
