import { Component, OnInit, ErrorHandler } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GetTasks, AddTasks, UpdateTasks, DeleteTasks } from '../actions/taska.action';
import { Task } from '../models/task.model';
import { GetdataService } from '../getdata.service';
import { TaskState } from '../states/task.state';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css'],
})
export class TasksListComponent implements OnInit {
  // isListTasks!: TasksStateModel;
  displayedColumns: string[] = ['id', 'name', 'created', 'completed', 'actions'];

  tasksForm!: FormGroup;

  // eslint-disable-next-line @typescript-eslint/unbound-method
  @Select(TaskState.selectTasks)
  tasksList$!: Observable<Task[]>;
  // tasksList$!: Observable<Task[]>;

  constructor(
    private getdataService: GetdataService,
    private store: Store,
    private dialog: MatDialog
  ) {
    this.store.dispatch(new GetTasks());
    this.tasksForm = new FormGroup({
      // eslint-disable-next-line @typescript-eslint/unbound-method
      name: new FormControl('', [Validators.required]),
    });

    // this.tasksList$ = this.store.select(state => state.task.tasks);
    // this.isListTasks = this.store.selectSnapshot<TasksStateModel>(state => {
    //    return state.task.tasks.length;
    //  });
    // console.log('TasksListComponent isListTasks', this.isListTasks);
    // if (!this.isListTasks) {
    //     this.store.dispatch(new GetTasks());
    // }
  }

  ngOnInit(): void {}

  get name() {
    return this.tasksForm.get('name');
  }

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

  updateTask(id: string): void {
    const newTask: Task = {
      id,
      name: 'Update Task',
      created: '24.10.2022 22:50',
      completed: false,
    };
    // this.getdataService.updateTasks(i, payload)
    // .subscribe((data: sTask) => console.log('Update ', data));
    this.store.dispatch(new UpdateTasks(newTask, id));
  }

  openDialog(element: Task) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    // dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: element.id,
      name: element.name,
      created: element.created,
      completed: element.completed,
    };
    this.dialog.open(TaskDialogComponent, dialogConfig);
  }

  deleteTask(id: string) {
    this.store.dispatch(new DeleteTasks(id));
  }

  onRowClicked(row: ErrorHandler) {
    console.log('Row clicked: ', row);
  }
}
