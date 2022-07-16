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
  submitted: boolean = false;
  image: any = '';
  error: string = '';
  showError: boolean = false;
  progress: boolean = false;
  
  constructor(private photoService: PhotoService, private fb: FormBuilder,
	      public router: Router) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.photoForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(6)]],
      photoUrl: ['', [Validators.required, Validators.pattern(/.*\.(png|jpe?g)$/i)]]
    })
  }

  onFileChange(event: any): void {
    if(event.target.files.length > 0) {
      const file = event.target.files[0]
      this.image = file;
    }
  }

  submitPhoto(ref:string): void {
    const moment_time = Date.parse(moment().tz('Africa/Cairo').format());
    const photo: Photo = {
      title: this.photoForm.value.title, 
      date: moment_time,
      photoUrl: ref
    }
    this.photoService.postPhoto(photo)
      .then(() => this.router.navigate(['/photos']))
      .catch(err => alert(err));
    this.submitted = false
  }
  
  onSubmit(): void {
    this.submitted = true
    if(this.photoForm.invalid) return;
    this.progress = true;
    this.photoService.uploadPhoto(this.image)
      .then(ref => this.submitPhoto(ref))
      .catch(err => {
	this.showError = true;
	setTimeout(() => this.showError = false, 2000)
      });
  }
}
