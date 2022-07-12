import { Injectable } from '@angular/core';
import { Firestore,
	 collection,
	 doc,
	 getDoc,
	 deleteDoc,
	 setDoc } from '@angular/fire/firestore';
import { Froala } from './froala';
@Injectable({
  providedIn: 'root'
})
export class FroalaService {
  private froala_db = collection(this.firestore, 'froala');
  
  constructor(public firestore: Firestore) { }

  getContent(id: string) {
    return getDoc(doc(this.froala_db, id)).then(froala => {
      if(froala.exists())
	return {id: froala.id, content: froala.data()['content']}
      else return {id: '', content: ''}
    })
  }

  updateContent(froala: Froala): Promise<any> {
    return setDoc(doc(this.froala_db, froala.id), {content: froala.content});
  }
}
