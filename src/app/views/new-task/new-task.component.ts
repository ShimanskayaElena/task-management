import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';

import { Task } from 'src/app/interfaces/task.interface';
import { AddTasks } from 'src/app/actions/taska.action';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css'],
})
export class NewTaskComponent implements OnInit {
  tasksForm!: FormGroup;

  constructor(private store: Store) {
    this.tasksForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
    });
  }

  get name() {
    return this.tasksForm.get('name');
  }

  ngOnInit(): void {}

  addTask(): void {
    const newTask: Task = {
      id: `string_${Math.trunc(Math.random() * 10)}`,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      name: this.tasksForm.value.name,
      created: '24.10.2022 22:50',
      completed: false,
    };
    this.store.dispatch(new AddTasks(newTask));
    this.tasksForm.reset();
  }
}
