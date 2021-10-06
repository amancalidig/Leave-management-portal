import { Injectable, NgZone } from '@angular/core';

import { auth } from 'firebase/app';

import { Router } from "@angular/router";
import { User }  from '../sevices/user'
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  // logout() {
  //   throw new Error('Method not implemented.');
  // }
  userData: any; // Save logged in user data
  firebaseAuth: any;

  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
  ) {
  
    this.afAuth.authState.subscribe(user => {
      if (user) {
       
        this.userData = user;
        console.log(this.userData)
        localStorage.setItem('user', JSON.stringify(this.userData));
        
        
        
        JSON.parse(localStorage.getItem('user') ?? ' ')
      } else {
        localStorage.setItem('user','');
        JSON.parse(localStorage.getItem('user') ?? ' ')
      }
    })
  }
   
  // Sign in with email/password
  async SignIn(email: any, password: any) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)

  }

  getUserRole = (email: string) => {
    const user = this.afs.collection("users").ref.where("userName", "==" , email ).onSnapshot((snap) => {
      snap.forEach((re) => {
        const userRole = re.data();
        console.log(userRole);
      })
    });
    return user;
  }

  getUserDataNew(result: any){
    let user = result.user
        const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
       
        userRef.ref.get()
        .then(function(doc) {
            if (doc.exists) {
                 var u = doc.data();
                console.log('User data: ', u);
                  result.user.role = u?.role
                  return result          
            } else {
              result.user.role = "user"
              return result
            }
       })
  }

  SignUp(email: any, password: any) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password,)
      .then((result) => {
       console.log("signUp", result)
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error.message)
      })
  }


 
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user') ?? ' ')
    return user !== null ;
  }
  getUserData(user:any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    let userData = userRef
    return userData
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
  logout() {
    this.firebaseAuth.auth.signOut();
    sessionStorage.clear();
    this.router.navigate(['']);
  }
  }



