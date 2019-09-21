import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from './shared/services/user';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { auth, functions } from 'firebase/app';
import { Observable } from 'rxjs';
import { Activity } from './shared/services/activity';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;
  readonly authState$: Observable<User | null> = this.fireAuth.authState;

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

    AddActivity(user, form) {
      let activity: Activity = {
        name : form.name,
        duration : form.duration,
        date : form.date
      };

      this.fireStore.collection('activities').doc(user.uid).collection('Activity').add(activity).then(function() {
        console.log('Document added');
      })
      .catch(error => window.alert(error.message))
    }
    DeleteActivity(user,activity){
      return this.fireStore.collection('activities').doc(user.uid).collection('Activity').doc(activity.id).delete()
      .then(() => {
        console.log('Document deleted')
      })
      .catch(error => window.alert(error.message))
    }

    GetActivities(user): Observable<any>{
      return this.fireStore.collection('activities').doc(user.uid).collection('Activity').snapshotChanges();

    }

  }
