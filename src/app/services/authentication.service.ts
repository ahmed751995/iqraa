import { Injectable } from '@angular/core';
import { Auth,
	 signInWithEmailAndPassword,
	 createUserWithEmailAndPassword,
	 GoogleAuthProvider,
	 signInWithPopup,
	 onAuthStateChanged,
	 signOut } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  
  constructor(public auth: Auth) { }

  Login(value: any) {
    return signInWithEmailAndPassword(this.auth, value.email, value.password);
  }

  Register(value: any) {
    return createUserWithEmailAndPassword(this.auth, value.email, value.password);
  }

  LoginWithGoogle(): Promise<any> {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  isLoggedin(): Promise<boolean> {
    return new Promise((resolve) => {
      onAuthStateChanged(this.auth, (user) => {
	if(user) {
	 resolve(true); 
	}
	else resolve(false);
      })
    })
  }

  Logout(){
    return signOut(this.auth)
  }

}
