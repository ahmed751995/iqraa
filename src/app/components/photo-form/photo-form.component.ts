import { Component, OnInit } from '@angular/core';
import { Photo } from '../../services/photo';
import { PhotoService } from '../../services/photo.service';
import { Router } from '@angular/router';
import * as moment from 'moment-timezone';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css']
})
export class PhotoFormComponent implements OnInit {
  photoForm!: FormGroup;
  
  constructor(private photoService: PhotoService, private fb: FormBuilder,
	      public router: Router) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.photoForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(6)]],
      photoUrl: ['', Validators.required]
    })
  }

  
  onSubmit(): void {
    if(this.photoForm.invalid) return;

    const moment_time = Date.parse(moment().tz('Africa/Cairo').format());
    const photo: Photo = {
      title: this.photoForm.value.title, 
      date: moment_time,
      photoUrl: this.photoForm.value.photoUrl
    }
    this.photoService.postPhoto(photo)
      .then(() => this.router.navigate(['/photos']))
      .catch(err => alert(err));
  }
}
