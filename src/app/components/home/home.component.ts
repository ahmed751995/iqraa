import { Component, OnInit } from '@angular/core';
import { FroalaService } from '../../services/froala.service';
import { Froala } from '../../services/froala';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  editorContent : string = "" ;
  
  constructor(private froalaService: FroalaService) { }

  ngOnInit(): void {
    // console.log("hihi")
    // this.froalaService.getContent('saif')
    //   .then(resp => this.editorContent = resp['content'])
    // this.froalaService.getContent('sai').then(resp => console.log(resp))
    if(!this.editorContent)
      this.froalaService.getContent()
	.then(resp => this.editorContent = resp.exists() ? resp.data()['editorContent'] : '')
	.catch(err => alert(err))
  }

  saveContent(): void {
    console.log('toggle save')
    this.froalaService.updateContent(this.editorContent);
  }
}
