import { Injectable } from '@angular/core';
import { Firestore,
	 collection,
	 doc,
	 getDoc,
	 deleteDoc,
	 setDoc } from '@angular/fire/firestore';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { Froala } from './froala';
@Injectable({
  providedIn: 'root'
})
export class FroalaService {
  private froala_db = collection(this.firestore, 'froala');
  
  constructor(public firestore: Firestore, public auth: Auth) { }

  getContent() {
    // return new Promise(resolve => {
    //   onAuthStateChanged(this.auth, user => {
    // 	if(user) {
	  
    // 	}
    //   })
    // })
    // return getDoc(doc(this.froala_db, id)).then(froala => {
    //   if(froala.exists())
    // 	return {id: froala.id, content: froala.data()['content']}
    //   else return {id: '', content: ''}
    // })
  }

  updateContent(froala: Froala): Promise<any> {
    return setDoc(doc(this.froala_db, froala.id), {content: froala.content});
  }
}
