import { renderTasks } from "./sort-filter-render-tasks";

export const listTask: HTMLUListElement | null = document.querySelector(".tasks");
export interface Task {
  title: string | undefined;
  dueDate: string;
  id: number;
}
export const taskArray: Task[] = JSON.parse(localStorage.getItem("tasks") ?? "[]");
renderTasks(taskArray);
