import { Injectable } from '@angular/core';
import { Firestore,
	 collection,
	 doc,
	 getDoc,
	 deleteDoc,
	 setDoc } from '@angular/fire/firestore';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class FroalaService {
  private froala_db = collection(this.firestore, 'froala');
  
  constructor(public firestore: Firestore, public auth: Auth) { }

  getContent(): Promise<any>{
    return new Promise((resolve, reject) => {
      onAuthStateChanged(this.auth, user => {
	if(user) {
	  resolve(getDoc(doc(this.froala_db, user.uid)));
	}
	else reject(null);
      })
    });
  }

  updateContent(content: string): Promise<any|null> {
    return new Promise((resolve, reject) => {
      if(this.auth.currentUser) {
	resolve(setDoc(doc(this.froala_db, this.auth.currentUser.uid), {editorContent: content}));
      }
      else reject(null);
    })
  }
}

