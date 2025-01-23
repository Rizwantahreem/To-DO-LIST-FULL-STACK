import { Component, OnInit } from '@angular/core';
import { PROVIDERS } from '../../constants';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';
import { ILogIn } from '../../interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent implements OnInit {
  private subscription: Array<Subscription> = [];
  provider: string = PROVIDERS.local;
  form!: FormGroup;
  error: string = '';
  isLogInForm: boolean = false;
  passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      formType: [this.isLogInForm ? 'logIn' : 'signUp', Validators.required],
      name: [''],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.minLength(8), Validators.required]],
      confirmPassword: ['', Validators.minLength(8)],
      agreeTerms: [false],
    });
  }

  switchForm(status: boolean) {
    this.isLogInForm = status;
    this.form.patchValue({ formType: this.isLogInForm ? 'logIn' : 'signUp' });
  }

  submitForm() {
    const values = this.form.value;
    this.error = '';

    switch (values.formType) {
      case 'logIn':
        if (!values.email || !this.emailPattern.test(values.email)) {
          this.error = 'valid email is required.';
          return;
        }
        if (!values.password || !this.passwordRegex.test(values.password)) {
          console.log(this.passwordRegex.test(values.password));
          this.error = 'Password required.';
          return;
        }
        const logInBody: ILogIn = {
          email: values.email,
          password: values.password,
        };
        this.subscription.push(
          this.userService.logIn(logInBody).subscribe(
            (_: any) => {},
            (error: any) => {
              console.error('error in log in.', error);
            }
          )
        );
        break;

      case 'signUp':
        if (!values.name || values.name?.trim()?.length <= 0) {
          this.error = 'Name is required';
          return;
        } else if (!values.email || !this.emailPattern.test(values.email)) {
          this.error = 'valid email is required.';
          return;
        } else if (
          !values.password ||
          !this.passwordRegex.test(values.password)
        ) {
          this.error = !values.password
            ? 'Password required.'
            : 'Password is not strong.';
          return;
        } else if (values.password !== values.confirmPassword) {
          this.error = 'Password does not match.';
          return;
        } else if (!values.agreeTerms) {
          this.error = 'Please agree with terms & policies.';
          return;
        }

        const signUpBody = {
          name: values.name,
          email: values.email,
          provider: values.provider,
          password: values.password,
        };

        this.subscription.push(
          this.userService.signUp(signUpBody).subscribe(
            (_: any) => {
              this.isLogInForm = true;
            },
            (error) => {
              console.error(error);
            }
          )
        );
        break;

      default:
        this.error = 'something wrong.';
        return;
    }

    this.router.navigate(['/home']);
  }
}
