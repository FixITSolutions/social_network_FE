import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { SharedModule } from '../shared/shared.module';
import { WallFeedComponent } from './main/wall-feed/wall-feed.component';
import { WallControlComponent } from './main/wall-control/wall-control.component';
import { NewPostComponent } from './main/new-post/new-post.component';
import { EditComponent } from './main/edit/edit.component';
import { CommentComponent } from './main/comment/comment.component';


@NgModule({
  declarations: [MainComponent, WallFeedComponent, WallControlComponent, NewPostComponent, EditComponent, CommentComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  entryComponents: [
    EditComponent
  ]
})
export class WallModule { }
