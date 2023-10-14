import { Component, OnInit, OnDestroy } from '@angular/core';
import { StateService } from 'src/app/Services/state.service';
import { ChatUser, User } from 'src/app/utilites/interfaces/interface';
import { Subscription, take } from 'rxjs';

@Component({
  selector: 'app-call',
  templateUrl: './call.component.html',
  styleUrls: ['./call.component.css'],
})
export class CallComponent implements OnInit, OnDestroy {
  callerName: string = '';
  callerAvatar: string = '';
  callingUser!: User;
  users: { [key: number]: User } = {};
  private selectedUserSubscription!: Subscription;

  constructor(private stateService: StateService) {}

  ngOnInit() {
    this.selectedUserSubscription = this.stateService.selectedUser$
      .pipe(take(1)) 
      .subscribe((user) => {
        this.stateService.users$.subscribe((users) => {
          this.users = users;
          this.callingUser = this.users[user!];
        });
      });
  }

  ngOnDestroy() {

    this.selectedUserSubscription.unsubscribe();
    this.stateService.setCalling(false)
  }

  onClick() {
    this.stateService.setCalling(false);
    console.log("called")
  }
}
