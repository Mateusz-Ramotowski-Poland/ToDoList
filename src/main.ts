import { Task } from "./interfaces";
import { addAllEventListeners } from "./add-all-event-listeners";
import { renderTasks } from "./sort-filter-render-tasks";

export const listTask: HTMLUListElement | null = document.querySelector(".tasks");
export const btnAddTask: HTMLButtonElement | null = document.querySelector(".manage-task__btn-add-task");
export const btnSortArray = document.querySelector(".manage-task__sort-tasks");

export const taskArray: Task[] = JSON.parse(localStorage.getItem("tasks") ?? "[]");
renderTasks(taskArray);

addAllEventListeners();
