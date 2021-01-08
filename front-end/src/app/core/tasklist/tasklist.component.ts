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
  user_id: any;
  user: any;
  group: any;
  currentTask = null;
  currentIndex = -1;
  name = '';
  constructor(private taskService: TaskService,
    private router: Router,
    private groupService: GroupService,
    private userService: UserService,) { }

  ngOnInit(): void {
    this.readTasks();
    this.user = new User;
    this.user_id = localStorage.getItem('id');

    this.groupService.getBoardList(this.user_id).subscribe(data => {
      this.groups = data;
    },error => console.log(error));

    this.userService.getUser(this.user_id).subscribe(data => {
      this.user = data;
    },error => console.log(error)
    )
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
  logOut() {
    localStorage.clear();
    this.router.navigate(['']);
  }
}
