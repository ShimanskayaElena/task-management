export interface Task {
  id: string;
  name: string;
  created: string;
  completed: boolean;
}

export interface TasksStateModel {
  tasks: Task[];
}
