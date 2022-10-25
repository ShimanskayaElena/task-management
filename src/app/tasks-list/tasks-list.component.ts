import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable, pipe, fromEvent } from 'rxjs';
import { tap } from 'rxjs/operators';
import {
  GetTasks,
  AddTasks,
  UpdateTasks,
  DeleteTasks
} from '../actions/taska.action';
import  { Task, TasksStateModel } from '../models/task.model';
import  { GetdataService } from '../getdata.service';
import { TaskState } from '../states/task.state';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent implements OnInit {

  // isListTasks: TasksStateModel;
  displayedColumns: string[] = ['id', 'name', 'created', 'completed', 'actions'];

  tasksForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required])
  });

  // tasksForm: FormGroup = this.fb.group({
  //   userId: [1],
  //   id: [''],
  //   title: [''],
  //   completed: [false]
  // })

  @Select(TaskState.selectTasks)
  tasksList$!: Observable<Task[]>;

  // tasksList$: Observable<Task[]>;

  constructor(private fb: FormBuilder, private getdataService: GetdataService, private store: Store) {
      this.store.dispatch(new GetTasks());
      // this.store.subscribe(data => {
      //   console.log("TasksListComponent constructor data.task.tasks", data.task.tasks);
      // });
      // this.tasksList$ = this.store.select(state => state.task.tasks); 
      // this.isListTasks = this.store.selectSnapshot<TasksStateModel>(state => state.task.tasks.length);
      // console.log('TasksListComponent isListTasks', this.isListTasks);
      // if (!this.isListTasks) {
      //     this.store.dispatch(new GetTasks());
      // }
  }

  ngOnInit(): void { }

  addTask(): void {
    const newTask = {
      id: 'string10',
      name: this.tasksForm.value.name,
      created: '24.10.2022 22:50',
      completed: false
    };
    this.store.dispatch(new AddTasks(newTask));
    this.tasksForm.reset();
  }

  updateTask(id: string): void {
    const newTask: Task = {
      id,
      name: 'Update Task',
      created: '24.10.2022 22:50',
      completed: false
    }
    // this.getdataService.updateTasks(i, payload).subscribe((data: sTask) => console.log('Update ', data));
    this.store.dispatch(new UpdateTasks(newTask, id));
  }

  deleteTask(id: string) {
    this.store.dispatch(new DeleteTasks(id));
  }

  chengeCheckbox(checked: boolean) {
    console.log('TasksListComponent chengeCheckbox checked', checked);
  }

}
