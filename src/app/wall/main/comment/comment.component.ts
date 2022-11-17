import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'sn-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() comment = {
    id: '',
    message: ''
  }
  constructor() { }

  ngOnInit() {
  }

}
