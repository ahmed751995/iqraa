import { Component, OnInit } from '@angular/core';
import { Photo } from '../../services/photo';
import { PhotoService } from '../../services/photo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css']
})
export class PhotoFormComponent implements OnInit {
  title: string = '';
  date: string =  '';
  tempdate: number = 0;
  photoUrl: string = '';
  
  constructor(private photoService: PhotoService, public router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const photo: Photo = {
      title: this.title,
      date: this.tempdate,
      photoUrl: this.photoUrl
    }
    this.photoService.postPhoto(photo)
      .then(() => this.router.navigate(['/photos']))
      .catch(err => alert(err));
  }
}
