import { addAllEventListeners, taskArray } from "./add-all-event-listeners";
import { renderStatistics, renderTasks } from "./render-tasks-statistics";
import { Statistics } from "./count-statistics";

export const listTask: HTMLUListElement | null = document.querySelector(".tasks");
export const btnAddTask: HTMLButtonElement | null = document.querySelector(".manage-task__btn-add-task");
export const btnSortArray: HTMLButtonElement | null = document.querySelector(".manage-task__sort-tasks");

export const btnFilter: HTMLButtonElement | null = document.querySelector(".manage-task__btn-filter");

const statistics = new Statistics(taskArray);
renderStatistics(statistics);
renderTasks(taskArray);
addAllEventListeners();
