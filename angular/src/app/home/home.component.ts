import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  private router = inject(Router);

  ngOnInit(): void {
    this.checkToken();
  }

  checkToken() {
    const token = window.localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
    }
  }
}
