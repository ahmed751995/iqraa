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

  ngOnInit(): void {
    this.photoService.getPhotos()
      .then(photos => this.photos = photos)
      .catch(err => alert(err))
  }

  openDetails(photo: Photo): void {
    console.log("openDetails function")
  }
  newPhoto(): void {
    this.router.navigate(['/photos/new-photo'])
  }

  deleteCard(id: string): void {
    this.photoService.deletePhoto(id)
      .then(() => this.photos = this.photos.filter(photo => photo.id !== id))
      .catch(err => alert(err))
  }

  nextPage(): void {
    const d:number= this.photos[this.photos.length - 1].date;
    this.photoService.getNext(d)
      .then(photos =>this.photos = photos)
      .catch(err => alert(err))
  }

  prevPage(): void {
    console.log(this.photos)
    const d: number= this.photos[0].date;
    this.photoService.getPrev(d)
      .then(photos =>this.photos = photos)
      .catch(err => alert(err))
  }
}
