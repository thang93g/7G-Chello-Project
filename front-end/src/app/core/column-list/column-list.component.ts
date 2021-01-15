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
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Noti } from './noti';
import { File } from 'src/app/core/column-list/file'
import { GroupService } from 'src/app/group/group.service';
import { HttpClient } from '@angular/common/http';

export interface DialogData {
  link: any;
  description: any;
  name: any;
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
  description!: any;
  name!: any;
  link!: any;
  members!: any;
  comment!: any;
  noti!: any;
  user_comment!: any;
  showAddTask!: any;
  showInput!: any;
  myColumn!: any;
  count_comment!: any;
  task_title!: any;
  term!: string;
  items!: Item[];
  showSearch: boolean = false;
  notis! : any
  add_column: boolean = false;
  

  toggle() {
    this.showSearch = !this.showSearch;}



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
    private http: HttpClient

  ) {}


  ngOnInit(): void {
    this.board_id = this.route.snapshot.params['board_id'];
    this.user = new User;
    this.column = new Column();
    this.myColumn = new Column();
    this.newtask = new Task();
    this.task = new Task();
    this.task_title = new Task();
    this.column.board_id = this.board_id;
    this.user_id = localStorage.getItem('id');
    this.boardService.getBoardDetail(this.board_id).subscribe(
      data => {
        this.board = data;
      }
    )
    this.getTaskById(this.task_id);
    this.loadData();
    this.comment = new Comment();
    this.noti = new Noti();
    this.http.get<Item[]>(`http://127.0.0.1:8000/api/tasks/`)
      .subscribe((data: Item[]) => {
        this.items = data;
        console.log(data);
      });

      this.user_id = localStorage.getItem('id');
  
      this.userService.getNoti(this.user_id).subscribe(data => {
        this.notis = data;
      },error => console.log(error))
  
      this.userService.getUser(this.user_id).subscribe(data => {
        this.user = data;
      },error => console.log(error)
      )
  }

  getTaskById(task_id: any) {
    this.taskService.getTaskById(task_id).subscribe(
      data => {
        this.task_title = data;
      }
    )
  }

  showEditNameInput(id: number){
    this.showInput = id;
    this.columnService.getColumn(id).subscribe(data => {
      this.myColumn = data
    },error => console.log(error))
  }

  clickTaskButton(column_id: number){
    this.showAddTask = column_id;
  }


  closeForm(){
    this.showAddTask = null;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  openAddColumn() {
    this.add_column = true;
  }
  closedAddColumn() {
    this.add_column = false;
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
      }, error => {this.toastr.error('Vui lòng nhập tên cột ')}
    )
  }

  addTask(id : any){
    this.newtask.column_id = id;
    this.newtask.label = '#e4e405';
    this.taskService.create(this.newtask).subscribe(
      data => {
        this.newtask = new Task();
        this.showAddTask = null;
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

  dropTask(event: CdkDragDrop<string[]>,column_id: number,column_name: string) {
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

      let str = `Đã di chuyển sang danh sách ${column_name}`
      this.noti.task_id = this.task.id;
      this.noti.content = str;
      this.noti.user_id = localStorage.getItem('id');

      this.userService.createNoti(this.noti).subscribe(
        data => {
          this.noti = new Noti();
        },error => console.log(error)
      )

      this.taskService.dropTask(id,column_id).subscribe(
        data => {
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
   this.columnService.updateColumn(id,this.myColumn)
   .subscribe(data =>{
     this.myColumn = new Column();
     this.showInput = null;
     this.loadData();
   },error => console.log(error))

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
    const dialogRef = this.dialog.open(CommentOnTaskDialog, {
      width: "500px",
      height: "500px",
      data : {task_id: task_id,
      comment: this.user_comment,
      title: this.task_title}
    });

    dialogRef.afterClosed().subscribe((result: any) => {
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
  no_comment!: any;
  noti!: any;
  task!: any;
  task_title!: any;
  edit_title: boolean = false;
  task_title_edit!: any;
  task_label_edit!: any;


  constructor(
    public dialogRef: MatDialogRef<DialogData>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private columnService: ColumnService,
    private userService: UserService,
    private taskService: TaskService,
    public dialog: MatDialog,

  ) {}

  ngOnInit(): void {
    this.comment = new Comment();
    this.task_id = this.data.task_id;
    this.user = new User();
    this.noti = new Noti();
    this.task = new Task();
    this.loadData();
    this.getUserComment(this.task_id);
    this.getTaskById(this.task_id);
   
  }

  getUserComment(task_id:any) {
    this.columnService.getUserComment(task_id).subscribe(
      data => {
        this.user_comment = data
      },error => {
        this.no_comment = error
      }
    );
  }

  loadData(){
    this.user_id = localStorage.getItem('id');
    this.userService.getUser(this.user_id).subscribe(data => {
      this.user = data;
    }
    );
  }

  editTitle() {
    this.edit_title = true;
  }
  cancleEditTitle() {
    this.edit_title = false;
  }

  editTitleConfirm() {
    this.task.title = this.task_title_edit;
    this.taskService.update(this.task_id,this.task).subscribe(
      data => {
        this.task_title_edit = new Task();
        this.getTaskById(this.task_id);
        this.cancleEditTitle();
      }
    )
  }

  deleteTask() {
    this.taskService.delete(this.task_id).subscribe(
      data=>{
        this.onNoClick();
        this.loadData();
      }
    )
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  editTaskLabel() {
    this.task.label = this.task_label_edit;
    console.log(this.task_label_edit);
    this.taskService.updateTaskLabel(this.task_id,this.task).subscribe(
      data=> {
        this.loadData();
      }
    )
  }

  getTaskById(task_id: any) {
    this.taskService.getTaskById(task_id).subscribe(
      data => {
        this.task_title = data;
      }
    )
  }

  commentOnTask(task_id: any) {
   this.comment.user_id = localStorage.getItem('id');
    this.comment.task_id = task_id;
    this.columnService.commentOnTask(this.comment).subscribe(
      data => {
        this.getUserComment(task_id);
        this.saveNoti();
      }
    );
  }

  saveNoti(){
    this.noti.task_id = this.task_id;
    this.noti.user_id = localStorage.getItem('id');
    this.noti.content = `Đã bình luận : ${this.comment.comment}`
    this.userService.createNoti(this.noti).subscribe(
      data => {
        this.noti = new Noti();
        this.comment = new Comment();
      },error => console.log(error)
    )
  }

  openUploadDialog(task_id:any) {
    const dialogRef = this.dialog.open(UploadDialog, {
      width: "500px",
      height: "250px",
      data: {task_id: task_id}
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      // this.toastr.success('The dialog was closed');
      this.loadData();
    });
  }
}

@Component({
  selector:'upload-dialog',
  templateUrl:'upload-dialog.html',
})
export class UploadDialog implements OnInit{
  downloadURL!: Observable<string>;
  user!: any;
  task_id!: any;
  name!: any;
  description!: any;
  link!: any;
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
            console.log(url);
          });
        })

      )
      .subscribe((url) => {
        if (url) {
          console.log(url);
        }
      });
  }

  uploadOnTask(task_id: any){
    this.file.task_id = task_id;
    this.columnService.uploadOnTask(this.file, task_id).subscribe(
      data => {
        this.toastr.success('Upload thành công');
      }
    );
    console.log(this.file)
  }

  ngOnInit(): void {
    this.file = new File();
  }
  constructor( public dialogRef: MatDialogRef<DialogData>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private storage: AngularFireStorage,
    private toastr: ToastrService,
    private columnService: ColumnService){}



}

interface Item{
  title: string;
  label: string;
  id: number;
  board_name: string;
  group_name: string;
}