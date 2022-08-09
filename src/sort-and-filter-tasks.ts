import {
  taskArray1,
  TaskArray,
  createNewTaskString,
  listTask,
} from "./add-comment-and-task";

const btnSortArray = document.querySelector("[name='manage-task__sort-tasks']");

function renderTasks(): void {
  for (const task of taskArray1) {
    const newTaskString = createNewTaskString(
      task.title,
      task.dueDate,
      task.id
    );
    listTask?.insertAdjacentHTML("beforeend", newTaskString);
    console.log();
  }
}

function sortAndRenderTasks(): void {
  const deepCopyOfTaskArray1 = JSON.parse(JSON.stringify(taskArray1)) ?? [];

  deepCopyOfTaskArray1.sort(function (a: TaskArray, b: TaskArray) {
    const taskADueDate = a["dueDate"].toUpperCase();
    const taskeBDueDate = b["dueDate"].toUpperCase();
    if (taskADueDate < taskeBDueDate) return -1;
    if (taskADueDate > taskeBDueDate) return 1;
    return 0;
  });

  if (listTask) {
    listTask.innerHTML = "";
  }

  renderTasks();
}

btnSortArray?.addEventListener("click", sortAndRenderTasks);
