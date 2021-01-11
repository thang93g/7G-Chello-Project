import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ColumnService } from './column.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Column } from './column';


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
    private columnService: ColumnService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.board_id = this.route.snapshot.params['board_id'];

    this.column = new Column();
    this.column.board_id = this.board_id;

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
        window.location.reload();
      }
    )
  }

  dropColumn(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
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
}
