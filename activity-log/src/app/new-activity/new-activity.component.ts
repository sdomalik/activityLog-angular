import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-new-activity',
  templateUrl: './new-activity.component.html',
  styleUrls: ['./new-activity.component.scss']
})

export class NewActivityComponent implements OnInit {
  userProfile: any;
  addActivityForm: FormGroup;
  date: string;
  user: any;

    constructor(
      private fb: FormBuilder,
      public authService: AuthService
    ) { }

  ngOnInit() {
    this.addActivityForm = this.fb.group({
      name: ['', [Validators.required]],
      duration: ['', [Validators.required]],
      date: this.date
    });
  }

  AddButtonClick(){
    this.authService.AddActivity(this.authService.userData, this.addActivityForm.value);
  }


}
