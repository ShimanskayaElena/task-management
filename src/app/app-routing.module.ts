import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { LoginFormComponent } from './login-form/login-form.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/task-list',
  },
  {
    path: 'task-list',
    component: TasksListComponent,
  },
  {
    path: 'login',
    component: LoginFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class AppRoutingModule {}
