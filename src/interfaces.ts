export interface Comment {
  author: string;
  comment: string;
  date: string;
}

export interface Subtask {
  subtask: string;
  done: boolean;
}

export interface Task {
  title: string | undefined;
  dueDate: string;
  id: number;
  done: false;
  comments: Comment[];
  subtasks: Subtask[];
}
