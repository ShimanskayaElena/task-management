import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {delay} from 'rxjs/operators';

import {Task} from './models/task.model';

@Injectable({
  providedIn: 'root',
})
export class GetdataService {
  constructor(private http:HttpClient) {}

  fetchTasks(): Observable<Task[]> {
    return this.http.get<Task[]>('assets/data.json').pipe(
        delay(1000),
        // tap(data => {
        //   console.log('GetdataService Observable data', data);
        // }),
    );
  }

  getTasks(): Promise<Task[]> {
    return this.fetchTasks().toPromise();
  }

  // fetchTasks(): Observable<any> {
  //   return this.http.get('https://jsonplaceholder.typicode.com/todos?userId=1');
  // }

  // getTasks(): any {
  //   return this.fetchTasks().toPromise();
  // }

  // addTasks( TaskData: any ) {
  //   return this.http.post('https://jsonplaceholder.typicode.com/todos?userId=1', TaskData);
  // }

  // deleteTasks( id:number ) {
  //   return this.http.delete('https://jsonplaceholder.typicode.com/todos/' + id);
  // }

  // updateTasks( id: number, payload: any ): Observable<any> {
  //   return this.http.put('https://jsonplaceholder.typicode.com/todos/' + id, payload);
  // }
}
