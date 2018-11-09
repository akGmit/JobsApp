import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgForm } from "@angular/forms";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';


import { MatTabChangeEvent } from '@angular/material';
import {MatTabsModule} from '@angular/material/tabs';
import { MatInputModule,
  MatMenuModule,
  MatCardModule,
  MatButtonModule,
  MatIconModule,
  MatToolbarModule,
  MatExpansionModule, MatFormFieldModule, MatSelectModule, MatFormFieldControl} from '@angular/material';
  import {MatDividerModule} from '@angular/material/divider';
  import {MatListModule} from '@angular/material/list';
  import {MatCheckboxModule} from '@angular/material/checkbox';

import { RoutingModule } from './routing.module';

import { LoginComponent } from './account/login/login.component';
import { NewUserComponent } from './account/new-user/new-user.component';
import { HomeComponent } from './home/home.component';
import { ApplicationComponent } from './application/application.component';
import { HttpClientModule } from '@angular/common/http';

import { ReactiveFormsModule } from '@angular/forms';
import { PostJobsComponent } from './post-jobs/post-jobs.component';
import { FindJobComponent } from './find-job/find-job.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NewUserComponent,
    HomeComponent,
    ApplicationComponent,
    PostJobsComponent,
    FindJobComponent,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    MatIconModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatMenuModule,
    MatFormFieldModule,
    MatMenuModule,
    MatSelectModule,
    MatTabsModule,
    MatDividerModule,
    MatListModule,
    MatCheckboxModule,
    FormsModule,
    RouterModule,
    RoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
