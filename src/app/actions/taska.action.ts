import { Task } from '../interfaces/task.interface';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class GetTasks {
  static readonly type = '[Tasks] Fetch';
}

export class AddTasks {
  static readonly type = '[Tasks] Add';

  constructor(public newTask: Task) {}
}

export class UpdateTasks {
  static readonly type = '[Tasks] Update';

  constructor(public newTask: Task, public id: string) {}
}

export class DeleteTasks {
  static readonly type = '[Tasks] Delete';

  constructor(public id: string) {}
}
