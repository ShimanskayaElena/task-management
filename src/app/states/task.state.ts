import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Observable, pipe } from 'rxjs';
import { tap, mergeMap, catchError, share } from 'rxjs/operators';
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
    getTasksFromState({ getState, patchState }: StateContext<TasksStateModel>, payload: GetTasks) {
        const state = getState();
        // when there is no data update on the server
        if (state.tasks.length === 0) {
            this.getdataService.fetchTasks().pipe(
                tap(data => {
                    patchState({ tasks: data }); 
                    return data;
                }),
                catchError((err: any) => {
                    console.log('getTasksFromState error', err);
                    return [];
                })
            ).subscribe();
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
            tasks: [...state.tasks, newTask]
        });
    }

    @Action(UpdateTasks)
    updateTasks({ getState, patchState }: StateContext<TasksStateModel>, { newTask, id }: UpdateTasks) {
        const state = getState();
        const tasksList = [...state.tasks].map(task => {
            return (task.id === id) ? newTask : task;
        });
        patchState({
            tasks: tasksList
        });
    }

    @Action(DeleteTasks)
    deleteTasks({ getState, patchState }: StateContext<TasksStateModel>, { id }: DeleteTasks) {
        const state = getState();
        const filteredTasks = state.tasks.filter(task => task.id !== id);
        patchState({
            tasks: filteredTasks
        });
    }
}