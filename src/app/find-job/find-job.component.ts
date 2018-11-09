import { Component, OnInit } from '@angular/core';
import { JobService } from '../services/job.service';
import { Job } from '../models/job';

@Component({
  selector: 'app-find-job',
  templateUrl: './find-job.component.html',
  styleUrls: ['./find-job.component.css']
})
export class FindJobComponent implements OnInit {

  constructor(private jobService: JobService) { }

  private jobs : Job[] = [];
  private emailSend;

  ngOnInit() {
    this.getAllJobs();
    
  }

  sendEmail(){
    if(this.emailSend){
      this.emailSend = {send: false};
    }else{
      this.emailSend = {send: true};
    }
  }

  getAllJobs(){
    this.jobService.getAllJobs().subscribe(res => {
      console.log(res);
      this.jobs = res;
    })
  }

  applyForJob(job){
    var jobid = {_id : job._id, send: this.emailSend.send};
    
    console.log(jobid);
    this.jobService.applyForJob(jobid).subscribe(res=>{
      console.log("Apply");
    })
  }

}
