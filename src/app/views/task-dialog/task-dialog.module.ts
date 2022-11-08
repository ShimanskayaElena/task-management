import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskDialogComponent } from './task-dialog.component';
import { MaterialModule } from 'src/app/shared/material.module';

@NgModule({
  declarations: [TaskDialogComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule],
  exports: [TaskDialogComponent],
  entryComponents: [TaskDialogComponent],
})
export class TaskDialogModule {}
