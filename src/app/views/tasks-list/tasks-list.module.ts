import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TasksListRoutingModule } from './tasks-list-routing.module';
import { TasksListComponent } from './tasks-list.component';
import { NewTaskComponent } from 'src/app/views/new-task/new-task.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { TaskDialogComponent } from 'src/app/views/task-dialog/task-dialog.component';

@NgModule({
  declarations: [TasksListComponent, NewTaskComponent, TaskDialogComponent],
  imports: [CommonModule, TasksListRoutingModule, FormsModule, ReactiveFormsModule, MaterialModule],
  exports: [TasksListComponent],
  entryComponents: [TaskDialogComponent],
})
export class TasksListModule {}
