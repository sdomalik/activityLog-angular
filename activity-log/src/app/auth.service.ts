import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from "./shared/services/user";
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { auth } from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;

  constructor(
    public fireStore: AngularFirestore,
    public fireAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
    ) {
      this.fireAuth.authState.subscribe(user => {
        if (user){
          this.userData = user;
          localStorage.setItem('user', JSON.stringify(this.userData));
          JSON.parse(localStorage.getItem('user'));
        } else {
          localStorage.setItem('user', null);
          JSON.parse(localStorage.getItem('user'));
        }
      })
     }

    login(email, password ) {
    return this.fireAuth.auth.signInWithEmailAndPassword(email, password)
    .then((result) => {
      this.ngZone.run(() => {
        this.router.navigate(['dashboard']);
      });
      this.SetUserData(result.user);
      }).catch(error => window.alert(error.message));
    }

    register(email, password) {
      return this.fireAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['']);
        });
        this.SetUserData(result.user)
      }).catch(error => window.alert(error.message));
    }

    logout() {
      return this.fireAuth.auth.signOut()
      .then(() => {
        localStorage.removeItem('user');
        this.router.navigate(['']);
      });
    }

    SetUserData(user) {
      const userRef: AngularFirestoreDocument<any> = this.fireStore.doc(`users/${user.uid}`);
      const userData: User = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
      }
      return userRef.set(userData, {
        merge: true
      })
    }
  }
