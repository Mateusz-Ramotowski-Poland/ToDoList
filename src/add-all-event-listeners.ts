import { addNewTask, addNewComment } from "./add-comment-and-task";
import { addNewSubtask } from "./add-subtask";
import { changeTaskDueDate } from "./change-due-date";
import { sortTasks, filterTasks } from "./sort-filter-tasks";
import { renderTasks } from "./render-tasks";
import { changeTaskCheckboxValue, changeSubtaskCheckboxValue } from "./change-checkboxes";
import { Task } from "./interfaces";
import { listTask, btnAddTask, btnSortArray, btnFilter } from "./main";

export const taskArray: Task[] = JSON.parse(localStorage.getItem("tasks") ?? "[]");
let actualTaskArray = taskArray;

export function addAllEventListeners() {
  btnAddTask?.addEventListener("click", addNewTask);
  listTask?.addEventListener("click", addNewComment);
  listTask?.addEventListener("click", addNewSubtask);
  listTask?.addEventListener("input", changeTaskDueDate);
  btnSortArray?.addEventListener("click", function (event) {
    renderTasks(sortTasks(actualTaskArray));
  });
  listTask?.addEventListener("input", changeTaskCheckboxValue);
  listTask?.addEventListener("input", changeSubtaskCheckboxValue);
  btnFilter?.addEventListener("click", function (event) {
    actualTaskArray = filterTasks(taskArray, event);
    renderTasks(actualTaskArray);
  });
}
