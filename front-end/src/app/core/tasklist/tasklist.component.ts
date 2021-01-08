import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GroupService } from 'src/app/group/group.service';
import { User } from 'src/app/user/user';
import { UserService } from 'src/app/user/user.service';
import { TaskService } from './task.service';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css'],
})
export class TasklistComponent implements OnInit {
  tasks: any;
  currentTask = null;
  currentIndex = -1;
  name = '';

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.readTasks();
  }

  readTasks(): void {
    this.taskService.readAll()
      .subscribe(
        tasks => {
          this.tasks = tasks;
          console.log(this.tasks);
        },
        error => {
          console.log(error);
        });
  }

  refresh(): void {
    this.readTasks();
    this.currentTask = null;
    this.currentIndex = -1;
  }

  setCurrentTask(task :any, index: number): void {
    this.currentTask = task;
    this.currentIndex = index;
  }

  deleteAllProducts(): void {
    this.taskService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.readTasks();
        },
        error => {
          console.log(error);
        });
  }

  searchByName(): void {
    this.taskService.searchByName(this.name)
      .subscribe(
          tasks => {
          this.tasks = tasks;
          console.log(tasks);
        },
        error => {
          console.log(error);
        });
  }
}
