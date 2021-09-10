import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore ,AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  private submissionForm: AngularFirestoreCollection<any>;

  user: any = JSON.parse(sessionStorage.getItem('user') || 'null');

  constructor(private fb:FormBuilder,private firestore:AngularFirestore,
    private router: Router
    
    ) {}
  
  ourForm:FormGroup
  
  ngOnInit(): void {
    this.submissionForm = this.firestore.collection('submissions');
    this.ourForm = this.fb.group({
    employeeName : ['',Validators.required],
    title : ['',Validators.required],
    date : ['',Validators.required],
    text : ['',Validators.required],
    });
  }
  getEmployee(){
  this.submissionForm = this.firestore.collection('submissions');
  return this.submissionForm.snapshotChanges();
  }
  // insertEmployee(value:any){
  //   this.submissionForm.add(value).then(res =>({
  //     employeeName:'',
  //     title:'',
  //     date:'',
  //     text:'',
  //   }));
  // }
  submitData(value:any){
    this.submissionForm.add(value).then(res => {
      console.log('Data added')
      
      this.router.navigate(['employee-leaves']);
    }).catch(err => console.log(err)
    );
  }
}
