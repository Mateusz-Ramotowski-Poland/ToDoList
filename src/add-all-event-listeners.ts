import { addNewTask, addNewComment } from "./add-comment-and-task";
import { addNewSubtask } from "./add-subtask";
import { changeTaskDueDate } from "./change-due-date";
import { sortTasks, filterTasks } from "./sort-filter-tasks";
import { renderTasks } from "./render-tasks-statistics";
import { changeTaskCheckboxValue, changeSubtaskCheckboxValue } from "./change-checkboxes";
import { addTaskUsingKeyboard } from "./keyboard-shortcut-add-task";
import { Task } from "./interfaces";
import { listTask, btnAddTask, btnSortArray, btnFilter } from "./main";
import { moveSubtask } from "./drag-drop-subtasks";
import { uploadImage } from "./upload-image";

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
  listTask?.addEventListener("mousedown", moveSubtask);
  listTask?.addEventListener("click", changeTaskCheckboxValue);
  listTask?.addEventListener("click", changeSubtaskCheckboxValue);
  btnFilter?.addEventListener("click", function (event) {
    actualTaskArray = filterTasks(taskArray, event);
    renderTasks(actualTaskArray);
  });
  window.addEventListener("keydown", addTaskUsingKeyboard);
  listTask?.addEventListener("change", uploadImage);
}
