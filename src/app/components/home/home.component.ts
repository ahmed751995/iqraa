import { Component, OnInit } from '@angular/core';
import { FroalaService } from '../../services/froala.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  editorContent : string = "" ;
  success: boolean = false;
  
  constructor(private froalaService: FroalaService) { }

  ngOnInit(): void {
    this.froalaService.getContent()
      .then(resp => this.editorContent = resp.exists() ? resp.data()['editorContent'] : '')
      .catch(err => alert(err))
  }
  
  saveContent(): void {
    this.froalaService.updateContent(this.editorContent)
      .then(() => {
	this.success = true;
	setTimeout(() => this.success = false, 2000);
      })
      .catch((error) => alert(error));
  }
}
