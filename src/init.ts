import { renderTasks } from "./sort-filter-render-tasks";

export interface Task {
  title: string | undefined;
  dueDate: string;
  id: number;
}

export const taskArray: Task[] = JSON.parse(localStorage.getItem("tasks")) || [];

console.log(taskArray);
