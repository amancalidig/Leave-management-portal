import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';

import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class AuthService {
  // private userSubject: BehaviorSubject<User>;
  user;

  constructor(private firebaseAuth: AngularFireAuth, public router: Router) {
    this.user = firebaseAuth.authState;
  }
  

  signup(email: string, password: string) {
    return this.firebaseAuth.auth.createUserWithEmailAndPassword(
      email,
      password
    );
  }

  login(email: string, password: string) {
    return this.firebaseAuth.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    this.firebaseAuth.auth.signOut();
    sessionStorage.clear();
    this.router.navigate(['']);
  }

  get isLoggedIn() {
    const user = JSON.parse(sessionStorage.getItem('user') || 'null');

    return user !== null;
  }
}
