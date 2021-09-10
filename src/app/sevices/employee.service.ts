import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private firebaseAuth: AngularFireAuth, public router: Router) { }
  
}
