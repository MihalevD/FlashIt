import { UserService } from 'src/app/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  applicants: any;

  constructor(private userService: UserService) {
    this.userService.applicants.subscribe((applicants: any) => {
      this.applicants = applicants;
      console.log(this.applicants);
    });
  }

  ngOnInit(): void {
    this.userService.getAllApplicants();
  }

  approve(id: any, index: number): void {
    this.applicants.splice(index, 1);
    this.userService.changeUser({ role: 'CREATOR', applied: false }, id);
  }

  disApprove(id: any, index: number): void {
    this.applicants.splice(index, 1);
    this.userService.changeUser({ applied: false }, id);
  }
}
