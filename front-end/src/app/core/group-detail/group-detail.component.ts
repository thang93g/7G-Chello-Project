import { Component, OnInit } from '@angular/core';
import { GroupService } from 'src/app/group/group.service';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.css']
})
export class GroupDetailComponent implements OnInit {
  group!: any;
  members!: any;

  constructor(private groupService: GroupService) { }

  ngOnInit(): void {
  }

}
