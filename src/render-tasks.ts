import { listTask } from "./main";
import { createNewTaskString } from "./add-comment-and-task";
import { Task } from "./interfaces";

export function renderTasks(tasks: Task[]): void {
  if (listTask) {
    listTask.innerHTML = "";
  }

  for (const task of tasks) {
    const newTaskString = createNewTaskString(task);
    listTask?.insertAdjacentHTML("beforeend", newTaskString);
  }
}