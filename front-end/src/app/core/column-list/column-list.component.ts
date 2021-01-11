import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ColumnService } from './column.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Column } from './column';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-column-list',
  templateUrl: './column-list.component.html',
  styleUrls: ['./column-list.component.css'],
})
export class ColumnListComponent implements OnInit {
  columns!: any;
  board_id!: any;
  column!: any;

  constructor(
    private router : Router,
    private columnService: ColumnService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.board_id = this.route.snapshot.params['board_id'];

    this.column = new Column();
    this.column.board_id = this.board_id;

    this.loadData();
  }

  loadData(){
    this.columnService.getColumnList(this.board_id).subscribe(
      (data: any) => {
        this.columns = data;
      }, error => console.log(error)
    )
  }

  addColumn(){
    console.log(this.column);
    this.columnService.createColumn(this.column).subscribe(
      data => {
        this.column = new Column();
        this.column.board_id = this.board_id;
        this.loadData();
        this.toastr.success('Thêm cột thành công');
      }, error => {this.toastr.error('Thêm cột không thành công')}
    )
  }

  dropColumn(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
    let id = this.columns[event.currentIndex].column.id;
    let index = event.currentIndex + 1;

    this.columnService.swapColumn(id,index).subscribe(
      data => {
        console.log(data);
      },error => console.log(error)
    );

    let int = event.previousIndex - event.currentIndex;
    console.log(id);
    if(int < 0 ){
      for(let i = 0; i < Math.abs(int); i++){
        index -= 1;
        let id = this.columns[index - 1].column.id;
        this.columnService.swapColumn(id,index).subscribe(
          data => {
            console.log(data);
          },error => console.log(error)
        );
      }
    }

    if(int > 0){
      for(let i = 0; i < int; i++){
        index += 1;
        let id = this.columns[index - 1].column.id;
        this.columnService.swapColumn(id,index).subscribe(
          data => {
            console.log(data);
          },error => console.log(error)
        );
      }
    }
  }

  dropTask(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }
  combackBoardList(){
    this.router.navigate(['board']);
  }
}
