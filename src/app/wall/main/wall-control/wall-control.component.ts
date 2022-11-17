import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'sn-wall-control',
  templateUrl: './wall-control.component.html',
  styleUrls: ['./wall-control.component.scss']
})
export class WallControlComponent implements OnInit {
  constructor() { }

  @Input() numberOfPosts: number = 12;
  @Output() refresh = new EventEmitter();
  @Output() toggle= new EventEmitter();
  ngOnInit() {
  }

  refreshFeed(){
    this.refresh.emit();
  }
  toggleNewPost(){
    this.toggle.emit();
  }
}
