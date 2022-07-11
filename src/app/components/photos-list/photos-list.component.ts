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
    console.log("card deleted", id)
    this.photoService.getPhoto(id).then(resp => console.log(resp))
  }
}
