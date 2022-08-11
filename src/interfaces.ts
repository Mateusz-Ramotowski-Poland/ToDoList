export interface Comment {
  author: string;
  comment: string;
  date: string;
}

export interface Subtask {
  subtask: string;
  done: boolean;
  id: number;
}

export interface Task {
  title: string | undefined;
  dueDate: string;
  id: number;
  done: boolean;
  comments: Comment[];
  subtasks: Subtask[];
}
