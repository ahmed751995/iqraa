import { Injectable } from '@angular/core';
import { Firestore,
	 collection,
	 addDoc,
	 getDocs,
	 doc,
	 getDoc,
	 deleteDoc,
	 updateDoc } from '@angular/fire/firestore';

// import { Observable } from 'rxjs';
import { Photo } from './photo';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private photo_db = collection(this.firestore, 'photo');
  
  constructor(public firestore: Firestore) { }

  getPhotos(): Promise<Photo[]> {
    return getDocs(this.photo_db)
      .then((response) => response.docs.map(photo => {
	return {id: photo.id, title: photo.data()['title'],
		date: photo.data()['date'],
		photoUrl: photo.data()['photoUrl']};
	}))
  }

  getPhoto(id: string): Promise<Photo | null> {
    return getDoc(doc(this.photo_db, id))
      .then(photo => {
	if(photo.exists())
	  return {id: photo.id, title: photo.data()['title'],
		  date: photo.data()['date'],
		  photoUrl: photo.data()['photoUrl']};
	else return null
      })
  }

  postPhoto(photo: Photo): Promise<any> {
    return addDoc(this.photo_db, photo);
  }

  deletePhoto(id:string): Promise<any> {
    return deleteDoc(doc(this.photo_db, id));
  }
}
