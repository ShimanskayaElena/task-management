import { Component, OnInit, ErrorHandler } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GetTasks, UpdateTasks, DeleteTasks } from 'src/app/actions/taska.action';
import { Task } from 'src/app/interfaces/task.interface';
import { GetdataService } from 'src/app/core/getdata.service';
import { TaskState } from 'src/app/states/task.state';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TaskDialogComponent } from 'src/app/views/task-dialog/task-dialog.component';
import { displayedColumns } from 'src/app/config/task-list.config';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css'],
})
export class TasksListComponent implements OnInit {
  // isListTasks!: TasksStateModel;
  displayedColumns = displayedColumns;

  @Select(TaskState.selectTasks)
  tasksList$!: Observable<Task[]>;
  // tasksList$!: Observable<Task[]>;

  constructor(
    private getdataService: GetdataService,
    private store: Store,
    private dialog: MatDialog
  ) {
    this.store.dispatch(new GetTasks());
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
