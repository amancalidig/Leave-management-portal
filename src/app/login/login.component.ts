import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/sevices/auth.service';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { map } from 'lodash';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: any;
  signupForm: any;
  loginError: boolean = false;
  signUpError: boolean = false;
  firestore: any;
  firestoreService: any;

  ngOnInit() {
    this.authService.getUserRole("none");
  }
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }

  constructor(
    public authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      password: ['', Validators.required],
    });
    this.signupForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  signup() {
    this.signUpError = false;

    console.log(
      this.signupForm.value.email,
      this.signupForm.value.password,
      'btn clicked'
    );
    this.authService
      .SignUp(this.signupForm.value.email, this.signupForm.value.password)
      .then((r: any) => {
        console.log(r);
      })
      .catch((e: any) => {
        console.log(e);
        this.signUpError = true;
      });
  }

  login() {
    this.loginError = false;

    console.log(
      this.loginForm.value.email,
      this.loginForm.value.password,
      'btn clicked'
    );
    this.authService
      .SignIn(this.loginForm.value.email, this.loginForm.value.password)
      .then((r:any) => {
        let user = r.user


      //   const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
       
      //   userRef.ref.get()
      //   .then(function(doc) {
      //       if (doc.exists) {
      //            var u = doc.data();
      //           console.log('User data: ', u);
      //             result.user.role = u?.role
      //             return result          
      //       } else {
      //         result.user.role = "user"
      //         return result
      //       }
      //  })
        console.log("user dat=====a", r.user);
      localStorage.setItem('user', JSON.stringify(r));

        this.router.navigate(['employee-leave']);
      })

      .catch((e:any) => {
        this.loginError = true;
        console.log(e);
      });
  }

  SignOut() {
    this.authService.SignOut();
  }
}
function getEmployees() {
  throw new Error('Function not implemented.');
}

function getuser() {
  throw new Error('Function not implemented.');
}

function switchMap(arg0: (users: any[]) => any): any {
  throw new Error('Function not implemented.');
}

