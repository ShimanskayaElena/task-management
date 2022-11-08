import { Injectable, ErrorHandler } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap, catchError } from 'rxjs/operators';
import { GetdataService } from '../core/getdata.service';
import { GetTasks, AddTasks, UpdateTasks, DeleteTasks } from '../actions/taska.action';
import { TasksStateModel, Task } from '../interfaces/task.interface';

export const getAppInitialState = (): TasksStateModel => ({
  tasks: [],
});

@State<TasksStateModel>({
  name: 'task',
  defaults: getAppInitialState(),
})
@Injectable()
export class TaskState {
  constructor(private getdataService: GetdataService) {}

  @Selector()
  static selectTasks(state: TasksStateModel): Task[] {
    return state.tasks;
  }

  @Action(GetTasks)
  getTasksFromState({ getState, patchState }: StateContext<TasksStateModel>) {
    const state: TasksStateModel = getState();
    const tasks: Task[] = state.tasks;
    // when there is no data update on the server
    if (tasks.length === 0) {
      this.getdataService
        .fetchTasks()
        .pipe(
          tap(data => {
            patchState({ tasks: data });
            return data;
          }),
          catchError((err: ErrorHandler) => {
            console.log('getTasksFromState error', err);
            return [];
          })
        )
        .subscribe();
    }
  }
  // async getTasksFromState(ctx: StateContext<TasksStateModel>, action: GetTasks) {
  //     try {
  //         const result = await this.getdataService.getTasks();
  //         // console.log('getTasksFromState Promise result', result);
  //         const state = ctx.getState();
  //         ctx.patchState({
  //             tasks: result
  //         });
  //     } catch(error) {
  //         console.log('getTasksFromState error', error);
  //     }
  // }

  @Action(AddTasks)
  addTasks({ getState, patchState }: StateContext<TasksStateModel>, { newTask }: AddTasks) {
    const state = getState();
    patchState({
      tasks: [...state.tasks, newTask],
    });
  }

  @Action(UpdateTasks)
  updateTasks(
    { getState, patchState }: StateContext<TasksStateModel>,
    { newTask, id }: UpdateTasks
  ) {
    const state = getState();
    const tasksList = [...state.tasks].map((task: Task) => {
      return task.id === id ? newTask : task;
    });
    patchState({
      tasks: tasksList,
    });
  }

  @Action(DeleteTasks)
  deleteTasks({ getState, patchState }: StateContext<TasksStateModel>, { id }: DeleteTasks) {
    const state = getState();
    const filteredTasks = state.tasks.filter((task: Task) => task.id !== id);
    patchState({
      tasks: filteredTasks,
    });
  }
}
