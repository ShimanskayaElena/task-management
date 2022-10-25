import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Observable, pipe } from 'rxjs';
import { tap, mergeMap, catchError } from 'rxjs/operators';
import { GetdataService } from '../getdata.service';
import {
    GetTasks,
    AddTasks,
    UpdateTasks,
    DeleteTasks
} from '../actions/taska.action';
import { TasksStateModel } from '../models/task.model';

export const getAppInitialState = (): TasksStateModel => ({
    tasks: []
});

@State<TasksStateModel>({
    name: 'task',
    defaults: getAppInitialState()
})

@Injectable()
export class TaskState {
    constructor(private getdataService: GetdataService) {}

    @Selector()
    static selectTasks( state: TasksStateModel) {
        return state.tasks;
    }

    @Action(GetTasks)
    // getTasksFromState(ctx: StateContext<ITasksStateModel>, payload: GetTasks) {
    //     // this.getdataService.fetchTasks().pipe(
    //     //     tap(data => {
    //     //         console.log('getTasksFromState data', data);
    //     //         const state = ctx.getState();
    //     //         ctx.setState({
    //     //             ...state,
    //     //             tasks: data
    //     //         }) 
    //     //     }),
    //     //     catchError((err: any) => {
    //     //         console.log('getTasksFromState error', err);
    //     //         return err;
    //     //         // ctx.dispatch(new GetTasksListFailed());
    //     //     })
    //     // );
    //     // this.getdataService.fetchTasks()
    //     // .subscribe(data => {
    //     //     // console.log('getTasksFromState data', data);
    //     //     const state = ctx.getState();
    //     //         ctx.setState({
    //     //             ...state,
    //     //             tasks: data
    //     //         });
    //     // });
    // }
    async getTasksFromState(ctx: StateContext<TasksStateModel>, action: GetTasks) {
        try {
            const result = await this.getdataService.getTasks();
            const state = ctx.getState();
            ctx.patchState({
                tasks: result
            });
        } catch(error) {
            console.log('getTasksFromState error', error);
        }
    }

    @Action(AddTasks)
    addTasks(ctx: StateContext<TasksStateModel>, { newTask }: AddTasks) {
        const state = ctx.getState();
        ctx.patchState({
            tasks: [...state.tasks, newTask]
        });
    }

    @Action(UpdateTasks)
    updateTasks(ctx: StateContext<TasksStateModel>, { newTask, id }: UpdateTasks) {
        const state = ctx.getState();
        const tasksList = [...state.tasks].map(task => {
            return (task.id === id) ? newTask : task;
        });
        ctx.patchState({
            tasks: tasksList
        });
    }

    @Action(DeleteTasks)
    deleteTasks(ctx: StateContext<TasksStateModel>, { id }: DeleteTasks) {
        const state = ctx.getState();
        const filteredTasks = state.tasks.filter(task => task.id !== id);
        ctx.patchState({
            tasks: filteredTasks
        });
    }
}