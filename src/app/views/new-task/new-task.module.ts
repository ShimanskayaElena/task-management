import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NewTaskRoutingModule } from './new-task-routing.module';
import { NewTaskComponent } from './new-task.component';
import { MaterialModule } from 'src/app/shared/material.module';

@NgModule({
  declarations: [NewTaskComponent],
  imports: [CommonModule, NewTaskRoutingModule, FormsModule, ReactiveFormsModule, MaterialModule],
  exports: [NewTaskComponent],
})
export class NewTaskModule {}
