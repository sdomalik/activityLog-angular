import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { map, tap, take  } from 'rxjs/operators';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  activityList: Observable<any>;

  constructor(
    public authService: AuthService,
  ) { }


  ngOnInit() {
    this.activityList = this.authService.GetActivities(this.authService.userData)
    .pipe(
      map(actList=>{
        const newActList = actList.map(doc=>{
          return{
            ...doc.payload.doc.data(),
            id: doc.payload.doc.id
          };
        });
        return newActList;
      })
    );

  }

  DeleteButtonClick(activity){
    this.authService.DeleteActivity(this.authService.userData, activity)
  }
}
