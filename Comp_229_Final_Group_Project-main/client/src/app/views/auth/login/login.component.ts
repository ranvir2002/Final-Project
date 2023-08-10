import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { apiConstants } from 'src/app/providers/api.constants';
import { CommonAPIService } from 'src/app/providers/api.service';
import { AuthGuard } from 'src/app/providers/auth.guard';
import { Constants } from 'src/app/providers/constant';
import { ErrorHandlingService } from 'src/app/providers/error-handling.service';
import { ErrorStateMatcherService } from 'src/app/providers/error-matcher.service';
import { GetSetService } from 'src/app/providers/getSet.provider';
import { Validator } from 'src/app/providers/Validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  messages: string[] = [];
  username: string = '';
  password: string = '';
  onSubmit() {}

  constructor(
    private errorHandlingService: ErrorHandlingService,
    private formBuilder: FormBuilder,
    private apiService: CommonAPIService,
    private router: Router,
    public authGuard: AuthGuard,
    public matcher: ErrorStateMatcherService,
    public getSetService: GetSetService
  ) {}
  login(): void {
    if (this.username && this.password) {
      this.apiService
        .post(apiConstants.signin, {
          username: this.username,
          password: this.password,
        })
        .subscribe({
          next: (data) => {
            if (data.statusCode === 201 || data.statusCode === 200) {
              localStorage.setItem('auth_token', data.token);

              this.router.navigate([Constants.Pages.HOME]);
            } else {
              this.errorHandlingService.handle(data.msg);
            }
          },
          error: (e) => {
            this.errorHandlingService.handle(e);
          },
        });
    }
  }

  ngOnInit(): void {}
}
