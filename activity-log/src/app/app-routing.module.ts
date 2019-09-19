import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { NewActivityComponent } from './new-activity/new-activity.component';


const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'new-activity',
    component: NewActivityComponent
  },
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
