import { Component } from '@angular/core';
import { AuthService } from 'src/app/sevices/auth.service';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: any;
  signupForm: any;
  loginError: boolean = false;
  signUpError: boolean = false;

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
      .signup(this.signupForm.value.email, this.signupForm.value.password)
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
      .login(this.loginForm.value.email, this.loginForm.value.password)
      .then((r) => {
        console.log(r.user);
        sessionStorage.setItem('user', JSON.stringify(r.user));

        this.router.navigate(['dashboard']);
      })

      .catch((e) => {
        this.loginError = true;
        console.log(e);
      });
  }

  logout() {
    this.authService.logout();
  }
}
