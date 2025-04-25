import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface UserData {
  id: string;
  name: string;
  email: string;
}

export interface AuthStoreState {
  userData: UserData;
}

@Injectable({
  providedIn: 'root',
})
export class AuthStoreService {
  private stateDefault = {
    userData: {
      id: '',
      name: '',
      email: '',
    },
  };

  private stateSubject = new BehaviorSubject<AuthStoreState>(this.stateDefault);

  state$ = this.stateSubject.asObservable();

  setState(newState: Partial<AuthStoreState>) {
    this.stateSubject.next({ ...this.stateSubject.getValue(), ...newState });
  }

  getState() {
    return this.stateSubject.getValue();
  }

  resetState() {
    this.stateSubject.next(this.stateDefault);
  }
}
