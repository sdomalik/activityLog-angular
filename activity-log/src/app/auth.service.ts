import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from 'firebase';
import { Observable } from 'rxjs/index';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly authState$: Observable<User | null> = this.fireAuth.authState;
  errorMessage: string = '';
  
  constructor(
    private fireAuth: AngularFireAuth,
    public router: Router
    ) { }

  get user(): User | null {
    return this.fireAuth.auth.currentUser;
  }

  login(email, password ) {
    return this.fireAuth.auth.signInWithEmailAndPassword(email, password)
    .then(() => this.router.navigate(['dashboard']))
    .catch(err => console.log(err.message));
  }

  register(email, password) {
    return this.fireAuth.auth.createUserWithEmailAndPassword(email, password)
    .then(() => this.router.navigate(['']))
    .catch(err => console.log(err.message));
  }

  logout() {
    return this.fireAuth.auth.signOut();
  }
}
