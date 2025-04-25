import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../environments/environment';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private http = inject(HttpClient);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);

  submitted = false;

  loginForm = this.formBuilder.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  loginSubmit() {
    this.submitted = true;
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.login();
    }
  }

  login() {
    this.http
      .post<{
        message: string;
        user: {
          id: number;
          email: string;
          name: string;
          token: string;
        };
      }>(`${environment.apiUrl}/auth/login`, {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      })
      .subscribe({
        next: (value) => {
          console.log(value);
          window.localStorage.setItem('token', value.user.token);
          this.router.navigate(['/']);
        },
        error(err) {
          console.error(err);
          alert(err.error.message);
        },
      });
  }
}
