import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { AppRoutes } from './config/routes.config';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: AppRoutes.TaskList,
  },
  {
    path: AppRoutes.TaskList,
    loadChildren: () => import('./views/tasks-list/tasks-list.module').then(m => m.TasksListModule),
  },
  {
    path: AppRoutes.Login,
    component: LoginFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class AppRoutingModule {}
