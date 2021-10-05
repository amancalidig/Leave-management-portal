import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFirestore ,AngularFirestoreCollection } from 'angularfire2/firestore';
import * as _ from 'lodash';
import { DatePipe } from '@angular/common';
import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private firestore:AngularFirestore, private datePipe: DatePipe) { }

  employeeList: AngularFirestoreCollection<any>;

  form: FormGroup = new FormGroup({
    $key: new FormControl(),
    startDate: new FormControl(''),
    title: new FormControl('', Validators.required),
    text: new FormControl(''),
    endDate: new FormControl(''),
     status: new FormControl(''),
    
  });

  initializeFormGroup() {
    this.form.setValue({
      $key: '', 
      startDate:'',   
      title: '',
      text: '',
      endDate:'',
      status:'pending',
    });
  }


  getEmployees() {
    return this.firestore.collection('Employees').snapshotChanges();
  }

  insertEmployee(employee:Employee) {
    const employeeObject = {...employee,
    startDate: employee.startDate == "" ? "" : this.datePipe.transform(employee.startDate, 'yyyy-MM-dd'),
    endDate: employee.endDate == "" ? "" : this.datePipe.transform(employee.endDate, 'yyyy-MM-dd'),
    
    };
    return this.firestore.collection('Employees').add(employeeObject);
  }
  

  updateEmployee(employee: Employee) {
    const employeeObject = {...employee,
      startDate: employee.startDate == "" ? "" : this.datePipe.transform(employee.startDate, 'yyyy-MM-dd'),
      endDate: employee.endDate == "" ? "" : this.datePipe.transform(employee.endDate, 'yyyy-MM-dd'),
    
    };
    this.firestore.doc('Employees/' + employee.$key).update(employeeObject);
  }

  deleteEmployee($key: string) {
    this.firestore.doc('Employees/' + $key).delete();
  }

  populateForm(employee:any) {
    this.form.setValue(_.omit(employee,'departmentName'));
  }
}
