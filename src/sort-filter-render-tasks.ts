import { createNewTaskString } from "./add-comment-and-task";
import { listTask, taskArray, Task } from "./init";

const btnSortArray = document.querySelector(".manage-task__sort-tasks");

export function renderTasks(tasks: Task[]): void {
  for (const task of tasks) {
    const newTaskString = createNewTaskString(task.title, task.dueDate, task.id);
    listTask?.insertAdjacentHTML("beforeend", newTaskString);
  }
}

function sortAndRenderTasks(): void {
  const deepCopyOfTaskArray = JSON.parse(JSON.stringify(taskArray)) ?? [];

  deepCopyOfTaskArray.sort(function (a: Task, b: Task) {
    const taskADueDate = a["dueDate"].toUpperCase();
    const taskeBDueDate = b["dueDate"].toUpperCase();
    if (taskADueDate < taskeBDueDate) return -1;
    if (taskADueDate > taskeBDueDate) return 1;
    return 0;
  });

  if (listTask) {
    listTask.innerHTML = "";
  }

  renderTasks(deepCopyOfTaskArray);
}

btnSortArray?.addEventListener("click", sortAndRenderTasks);
