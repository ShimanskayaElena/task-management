import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task } from 'src/app/interfaces/task.interface';
import { Store } from '@ngxs/store';
import { UpdateTasks } from 'src/app/actions/taska.action';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.css'],
})
export class TaskDialogComponent implements OnInit {
  description = 'Update data';

  updateTaskForm: FormGroup;

  name: string;

  newTask!: Task;

  constructor(
    private dialogRef: MatDialogRef<TaskDialogComponent>,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) public data: Task
  ) {
    this.name = data.name;
    this.updateTaskForm = new FormGroup({
      completed: new FormControl(data.completed),
    });
  }

  ngOnInit(): void {}

  close() {
    this.dialogRef.close();
  }

  save() {
    this.store.dispatch(new UpdateTasks(this.newTask, this.data.id));
    this.dialogRef.close();
  }

  chengeCheckbox(event: MatCheckboxChange) {
    this.newTask = { ...this.data, completed: event.checked };
  }
}
