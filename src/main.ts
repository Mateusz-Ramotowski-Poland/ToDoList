import { addAllEventListeners, taskArray } from "./add-all-event-listeners";
import { renderTasks } from "./render-tasks";
import { getcountedComments, getcountedCommentsToday } from "./count-statistics";

export const listTask: HTMLUListElement | null = document.querySelector(".tasks");
export const btnAddTask: HTMLButtonElement | null = document.querySelector(".manage-task__btn-add-task");
export const btnSortArray: HTMLButtonElement | null = document.querySelector(".manage-task__sort-tasks");

export const btnFilter: HTMLButtonElement | null = document.querySelector(".manage-task__btn-filter");

const commentsTag = document.querySelector(".statistics__comments") as HTMLElement;
const commentsTodayTag = document.querySelector(".statistics__comments-today") as HTMLElement;

renderTasks(taskArray);
addAllEventListeners();
commentsTag.textContent = "" + getcountedComments(taskArray);
commentsTodayTag.textContent = "" + getcountedCommentsToday(taskArray);
