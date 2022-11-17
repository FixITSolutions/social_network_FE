import { Component, OnInit ,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PostService } from "../../services/post.service";


@Component({
  selector: 'sn-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  alertStatus: boolean = false;
  alertMessage: string;

  title: string = 'post title';
  description: string = 'post descrip';
  constructor(
    private postService : PostService,
    public dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

  edit(){
    if(!this.data.title || !this.data.description){
      return 
    }

    this.postService.edit(this.data).subscribe((data)=>{
      this.dialogRef.close();
    })
  }
}
