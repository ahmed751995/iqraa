import { Injectable } from '@angular/core';
import { Firestore,
	 collection,
	 addDoc,
	 getDocs,
	 doc,
	 getDoc,
	 deleteDoc,
	 query, orderBy, startAfter, limit,startAt, endBefore, limitToLast } from '@angular/fire/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";

// import { Observable } from 'rxjs';
import { Photo } from './photo';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private photo_db = collection(this.firestore, 'photo');
  private lim: number = 6;
  
  constructor(public firestore: Firestore) { }

  getPhotos(): Promise<Photo[]> {
    let start: number = 0;
    if(localStorage.getItem('history'))
      start = parseInt(JSON.parse(localStorage.getItem('history')!))
    const q =  query(this.photo_db, orderBy('date'),startAt(start), limit(this.lim));
    return getDocs(q)
      .then((response) => this.formatedPhotos(response.docs));
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

  formatedPhotos(photos: any[]): Photo[] | [] {
    return photos.map(photo => {
      return {id: photo.id, title: photo.data()['title'],
	      date: photo.data()['date'],
	      photoUrl: photo.data()['photoUrl']};
    });
  }

  getNext(date: number): Promise<Photo[] | []> {
    const q =  query(this.photo_db, orderBy('date'),startAfter(date), limit(this.lim));
    return getDocs(q).then(response => this.formatedPhotos(response.docs));
  }

  getPrev(date: number): Promise<Photo[] | []> {
    const q = query(this.photo_db, orderBy('date'), endBefore(date), limitToLast(this.lim))
    return getDocs(q).then(response => this.formatedPhotos(response.docs));
  }

  uploadPhoto(photo: any): Promise<string> {
    const pathRef = ref(getStorage(), `/photos/${photo.name}`);
    return uploadBytes(pathRef, photo)
      .then((snapshot) => getDownloadURL(snapshot.ref))
  }
}
