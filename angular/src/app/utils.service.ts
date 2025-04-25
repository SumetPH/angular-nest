import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}

  public apiHeader() {
    return {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${window.localStorage.getItem('token')}`,
      },
    };
  }

  public isAuthenticated() {
    // get token
    const token = window.localStorage.getItem('token');
    // check token
    if (!token) return false;
    // decode token
    const decoded = jwtDecode(token);
    // check token
    if (!decoded || !decoded.exp) return false;
    // check token expired
    if (decoded.exp < Date.now() / 1000) return false;
    return decoded as {
      id: string;
      name: string;
      email: string;
      iat: number;
      exp: number;
    };
  }
}
