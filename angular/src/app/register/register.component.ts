import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.development';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private http = inject(HttpClient);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);

  submitted = false;

  registerForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    passwordConfirm: ['', [Validators.required]],
  });

  registerSubmit() {
    this.submitted = true;
    if (this.registerForm.valid) {
      this.register();
    }
  }

  async register() {
    this.http
      .post(`${environment.apiUrl}/auth/register`, {
        name: this.registerForm.value.name,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        passwordConfirm: this.registerForm.value.passwordConfirm,
      })
      .subscribe({
        next: (value) => {
          alert('Register Success');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error(err);
          alert(err.error.message);
        },
      });
  }
}
