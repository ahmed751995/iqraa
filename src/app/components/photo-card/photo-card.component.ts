import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Photo } from '../../services/photo';

@Component({
  selector: 'app-photo-card',
  templateUrl: './photo-card.component.html',
  styleUrls: ['./photo-card.component.css']
})
export class PhotoCardComponent implements OnInit {
  @Input() photo!: Photo;

  @Output() onClick: EventEmitter<any> = new EventEmitter();
  @Output() onDelete: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  cardClick(): void {
    this.onClick.emit();
  }
  
  deleteClick(): void {
    this.onDelete.emit();
  }

}
