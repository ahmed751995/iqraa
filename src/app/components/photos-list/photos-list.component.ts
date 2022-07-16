import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Photo } from '../../services/photo';
import { PhotoService } from '../../services/photo.service';

@Component({
  selector: 'app-photos-list',
  templateUrl: './photos-list.component.html',
  styleUrls: ['./photos-list.component.css']
})

export class PhotosListComponent implements OnInit {
  photos: Photo[] = [];
  constructor(public router: Router, private photoService: PhotoService) { }
  show_prev = true;
  show_next = true;
  ngOnInit(): void {
    this.photoService.getPhotos()
      .then(photos => {
	if(photos.length > 0) {
	  this.updateView(photos);
	}
      })
      .catch(err => alert(err))
  }
  
  newPhoto(): void {
    this.router.navigate(['/photos/new-photo'])
  }

  deleteCard(id: string): void {
    this.photoService.deletePhoto(id)
      .then(() => this.photos = this.photos.filter(photo => photo.id !== id))
      .catch(err => alert(err))
  }

  updateView(photos: Photo[]): void {
    localStorage.setItem('history', JSON.stringify(photos[0].date))
    this.photos = photos
    window.scrollTo(0,0);
  }
  
  nextPage(): void {
    const d:number= this.photos[this.photos.length - 1].date;
    this.photoService.getNext(d)
      .then(photos => {
	if(photos.length > 0) {
	  this.updateView(photos)
	  this.show_prev = true;
	} else this.show_next = false;
      })
      .catch(err => alert(err))
  }

  prevPage(): void {
    const d: number= this.photos[0].date;
    this.photoService.getPrev(d)
      .then(photos => {
	if(photos.length > 0) {
	  this.updateView(photos)
	  this.show_next = true;
	} else this.show_prev = false;
      })
      .catch(err => alert(err))
  }
}
