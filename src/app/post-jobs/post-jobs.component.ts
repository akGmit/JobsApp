import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { JobService } from '../services/job.service';
import { Job } from '../models/job';
import { MatTabChangeEvent } from '@angular/material';

@Component({
  selector: 'app-post-jobs',
  templateUrl: './post-jobs.component.html',
  styleUrls: ['./post-jobs.component.css']
})
export class PostJobsComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private jobService: JobService) { }

  private jobs : Job[] = [];
  private jobsApplied : Job[] = [];

  ngOnInit() {
    this.getUserPostedJobs();
  }

  jobForm = this.formBuilder.group({
    type: ['', Validators.required],
    description:['', Validators.required]
  });

  getUserPostedJobs(){
    
    this.jobService.getUserJobs().subscribe(res => {
      this.jobs = res;
    })   
  }

  onLinkClick(event: MatTabChangeEvent){
    this.getUserPostedJobs();
  }

  jobDelete(jobID){
    console.log(jobID);
    this.jobService.deleteJob(jobID).subscribe(res => {
      if(res === true){
        this.getUserPostedJobs();
      }
    });
  }

  getAppliedForJobs(){
    console.log("applied for jobs");
    this.jobService.getAppliedForJobs().subscribe(res =>{
      console.log(res);
      this.jobsApplied = res;
    });
  }

  onSubmit(){
    console.log(this.jobForm.value);
    this.jobService.setJob(this.jobForm.value);
    this.jobService.postJob(this.jobService.getJob()).subscribe(res=>{
      console.log(res)
    });
  }

}
