import { Component, OnInit } from '@angular/core';

export interface Exercises {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-new-activity',
  templateUrl: './new-activity.component.html',
  styleUrls: ['./new-activity.component.scss']
})

export class SelectExercise {
  foods: Exercises[] = [
    {value: 'Gym workout-0', viewValue: 'Gym workout'},
    {value: 'Running-1', viewValue: 'Running'},
    {value: 'Cycling-2', viewValue: 'Cycling'},
    {value: 'Swimming-3', viewValue: 'Swimming'},
    {value: 'Hiking-4', viewValue: 'Hiking'},
    {value: 'Streching-5', viewValue: 'Streching'},
    {value: 'Team sport-6', viewValue: 'Team sport'}
  ];
}
export class NewActivityComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
