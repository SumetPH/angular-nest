import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from '../utils.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthStoreService, AuthStoreState } from '../store/authStore.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  private router = inject(Router);
  private utilsService = inject(UtilsService);
  private http = inject(HttpClient);

  userData = {
    id: '',
    name: '',
    email: '',
  };

  authStoreState: AuthStoreState | undefined;

  constructor(private authStoreService: AuthStoreService) {}

  async ngOnInit() {
    this.authStoreService.state$.subscribe((state) => {
      this.authStoreState = state;
    });

    this.getProfile();
  }

  getProfile() {
    this.http
      .get<{
        id: string;
        name: string;
        email: string;
      }>(`${environment.apiUrl}/auth/me`, this.utilsService.apiHeader())
      .subscribe({
        next: (value) => {
          this.userData = value;
        },
        error: (err) => {
          console.error(err);
          this.router.navigate(['/login']);
        },
      });
  }

  logout() {
    window.localStorage.removeItem('token');
    this.authStoreService.resetState();
    this.router.navigate(['/login']);
  }
}
