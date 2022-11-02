export interface Task {
  // userId: number;
  // id: number;
  // title: string;
  // completed: boolean;
  id: string;
  name: string;
  created: string;
  completed: boolean;
}

export interface TasksStateModel {
  tasks: Task[];
}
