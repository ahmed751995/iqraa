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
  }

  saveContent(): void {
    const froala: Froala = {
      id: 'saif',
      content: this.editorContent
    }
    this.froalaService.updateContent(froala).then(resp => console.log(resp));
  }
}
