import { Injectable, NgZone } from '@angular/core';

import { auth } from 'firebase/app';

import { Router } from "@angular/router";
import { User }  from '../sevices/user'
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})

export class AdminService {
  logout() {
    throw new Error('Method not implemented.');
  }
  userData: any; // Save logged in user data

  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
  
    this.afAuth.authState.subscribe(admin => {
      if (admin) {
        console.log(this.userData)
        this.userData = admin;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user') ?? ' ')
      } else {
        localStorage.setItem('user','');
        JSON.parse(localStorage.getItem('user') ?? ' ')
      }
    })
  }

  // Sign in with email/password
  SignIn(email: any, password: any) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((result:any) => {
        this.ngZone.run(() => {
          this.router.navigate(['employee-leave']);
        });
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  SignUp(email: any, password: any) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password,)
      .then((result) => {
        
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error.message)
      })
  }


 
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('admin') ?? ' ')
    return user !== null ;
  }
  SetUserData(user:any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      userName: user.email,
      role: 'user',
    
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  // Sign out
  SignOut() {
    return this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['']);
    })
  }



}
