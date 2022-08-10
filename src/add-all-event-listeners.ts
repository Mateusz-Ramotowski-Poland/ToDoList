import { addNewTask, addNewComment } from "./add-comment-and-task";
import { addNewSubtask } from "./add-subtask";
import { changeTaskDueDate } from "./change-due-date";
import { sortTasks } from "./sort-filter-tasks";
import { renderTasks } from "./render-tasks";

import { listTask, btnAddTask, btnSortArray, taskArray } from "./main";

export function addAllEventListeners() {
  btnAddTask?.addEventListener("click", addNewTask);
  listTask?.addEventListener("click", addNewComment);
  listTask?.addEventListener("click", addNewSubtask);
  listTask?.addEventListener("input", changeTaskDueDate);
  btnSortArray?.addEventListener("click", function () {
    renderTasks(sortTasks(taskArray));
  });
}
