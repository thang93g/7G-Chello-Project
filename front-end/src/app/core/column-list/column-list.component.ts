import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ColumnService } from './column.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Column } from './column';
import { TaskService } from '../tasklist/task.service';
import { Task } from './task';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/user/user';
import { UserService } from 'src/app/user/user.service';
import { BoardService } from '../boardlist/board.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { DialogOverviewExampleDialog } from '../boardlist/boardlist.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { GroupService } from 'src/app/group/group.service';

export interface DialogData {
  task_id: any;
}

@Component({
  selector: 'app-column-list',
  templateUrl: './column-list.component.html',
  styleUrls: ['./column-list.component.css'],
})
export class ColumnListComponent implements OnInit {
  title = 'cloudsSorage';
  selectedFile!: any;
  columns!: any;
  board_id!: any;
  column!: any;
  newtask!: any;
  task!: any;
  user!: any;
  user_id!: any;
  board!: any;
  id!: any;
  show!: boolean;
  dialogRef: any;
  task_id!: any;
  downloadURL!: Observable<string>;
  members!: any;
  comment!: any;
  user_comment!: any;



  constructor(
    private router : Router,
    private columnService: ColumnService,
    private route: ActivatedRoute,
    private taskService: TaskService,
    private toastr: ToastrService,
    private userService: UserService,
    private storage: AngularFireStorage,
    public dialog: MatDialog,
    private groupService: GroupService,
    private boardService: BoardService,

  ) {}


  ngOnInit(): void {
    // this.getToken();
    this.board_id = this.route.snapshot.params['board_id'];
    this.user = new User;
    this.column = new Column();
    this.newtask = new Task();
    this.task = new Task();
    this.column.board_id = this.board_id;
    this.user_id = localStorage.getItem('id');
    this.boardService.getBoardDetail(this.board_id).subscribe(
      data => {
        this.board = data;
      }
    )
    this.loadData();
    this.comment = new Comment();
 
  }
  

 

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  getToken() {
    if(localStorage.getItem('token')){
      this.router.navigate(['board/:board_id']);
    }else{
      this.router.navigate(['error']);
    }
  }

  loadData(){
    this.columnService.getColumnList(this.board_id).subscribe(
      (data: any) => {
        this.columns = data;
        console.log(data)
      }, error => console.log(error)
    );
    this.userService.getUser(this.user_id).subscribe(data => {
      this.user = data;
      console.log(data);
    },error => console.log(error)
    );
    
    
  }

  

  logOut() {
    localStorage.clear();
    this.router.navigate(['']);
  }
  getInfo() {
    this.router.navigate(['profile']);
  }

  goHome() {
    this.router.navigate(['board']);
  }

  addColumn(){
    this.columnService.createColumn(this.column).subscribe(
      data => {
        this.column = new Column();
        this.column.board_id = this.board_id;
        this.loadData();
        this.toastr.success('Thêm cột thành công');
      }, error => {this.toastr.error('Thêm cột không thành công')}
    )
  }

  addTask(id : any){
    this.newtask.column_id = id;
    this.newtask.label = 'aaa';
    this.taskService.create(this.newtask).subscribe(
      data => {
        this.newtask = new Task();
        this.loadData();
      }
    )
  }

  dropColumn(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
    for(let i = 0;i < this.columns.length;i++){
      this.column = this.columns[i];
      let id = this.column.column.id;
      this.columnService.swapColumn(id,i).subscribe(
        data => {
          // console.log(data);
        },error => console.log(error)
      );
    }
  }

  dropTask(event: CdkDragDrop<string[]>,column_id: number) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      let arr = event.container.data;
      for(let i = 0;i < arr.length; i++){
        this.task = arr[i];
        let id = this.task.id;
        this.taskService.swapTask(id,i).subscribe(
          data => {
          },error => console.log(error)
        )
      }
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex,);
      let array1 = event.previousContainer.data;
      let array2 = event.container.data;

      this.task = event.container.data[event.currentIndex];
      let id = this.task.id;
      this.taskService.dropTask(id,column_id).subscribe(
        data => {
          console.log(data)
        },error => console.log(error)
      )


      for(let i = 0;i < array1.length; i++){
        this.task = array1[i];
        let id = this.task.id;
        this.taskService.swapTask(id,i).subscribe(
          data => {
          },error => console.log(error)
        )
      }

      for(let j = 0;j < array2.length; j++){
        this.task = array2[j];
        let id = this.task.id;
        this.taskService.swapTask(id,j).subscribe(
          data => {
          },error => console.log(error)
        )
      }
    }
  }
  combackBoardList(){
    this.router.navigate(['board']);
  }

  changeNameList(id : number){
    this.columnService.getColumn(id).subscribe(data => {
      this.column = data
    })
   this.columnService.updateColumn(id,this.column)
   .subscribe(data =>{
     this.column = new Column();
     this.loadData();
   })

  }

  
  openDialog(id: number) {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {board_id: id}
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed');
      this.loadData();
    });
  }

  

  showFormAddFile() {
    this.show = false;
  }
  hideFormAddFile() {
    this.show = true;
  }


  openCommentDialog(task_id:any) {
    this.dialog.open(CommentOnTaskDialog, {
      width: "500px",
      height: "500px",
      data : {task_id: task_id,
      comment: this.user_comment}
    })
  }

  openUploadDialog() {
    const dialogRef = this.dialog.open(UploadDialog, {
      width: "500px",
      height: "500px",
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      this.toastr.success('The dialog was closed');
      this.loadData();
    });
  }
}


@Component({
  selector: 'comment-dialog',
  templateUrl: 'comment-dialog.html',
})
export class CommentOnTaskDialog implements OnInit {

  user_id!: any;
  user!: any;
  task_id!: any;
  comment!: any; 
  user_comment!: any;
  show_cmt: boolean = false;
  no_comment!: any;


  constructor(
    public dialogRef: MatDialogRef<DialogData>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private columnService: ColumnService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.comment = new Comment();
    this.task_id = this.data.task_id;
    this.user = new User;
    this.loadData();
    this.getUserComment(this.task_id);
    this.showComment();
  }

  getUserComment(task_id:any) {
    this.columnService.getUserComment(task_id).subscribe(
      data => {
        this.user_comment = data
        console.log(data);
      },error => {
        this.no_comment = error
        console.log(this.no_comment);;
      }
    );
  }

  loadData(){
    this.user_id = localStorage.getItem('id');
    this.userService.getUser(this.user_id).subscribe(data => {
      this.user = data;
      console.log(data);
    }
    );
    
    
  }
  showComment() {
    this.show_cmt = true;
  }
 
  commentOnTask(task_id: any) {
   this.comment.user_id = localStorage.getItem('id');
    this.comment.task_id = task_id;
    this.columnService.commentOnTask(this.comment).subscribe(
      data => {
        this.getUserComment(task_id);
      }
    );
  }
}

@Component({
  selector:'upload-dialog',
  templateUrl:'upload-dialog.html',
})
export class UploadDialog implements OnInit{
  downloadURL!: Observable<string>;
  user!: any;
  file: any;

  onFileSelected(event: any) {

    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `UserFile/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`UserFile/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe((url: any) => {
            if (url) {
              this.file.link = url;
            }
            this.toastr.success('Upload thành công');
          });
        })
      )
      .subscribe((url) => {
        if (url) {
          console.log(url);
        }
      });
  }
  ngOnInit(): void {
  }
  constructor( public dialogRef: MatDialogRef<DialogData>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private storage: AngularFireStorage,
    private toastr: ToastrService,){}

}

