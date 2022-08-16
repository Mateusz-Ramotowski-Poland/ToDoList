import { listTask } from "./main";
import { createNewTaskString } from "./add-comment-and-task";
import { Task } from "./interfaces";
import { Statistics } from "./count-statistics";

const commentsTag = document.querySelector(".statistics__comments") as HTMLElement;
const commentsTodayTag = document.querySelector(".statistics__comments-today") as HTMLElement;
const doneTasksTag = document.querySelector(".statistics__done-tasks") as HTMLElement;
const undoneTasksTag = document.querySelector(".statistics__undone-tasks") as HTMLElement;
const mostActiveComentatorTag = document.querySelector(".statistics__comentator") as HTMLElement;

export function renderTasks(tasks: Task[]): void {
  if (listTask) {
    listTask.innerHTML = "";
  }

  for (const task of tasks) {
    const newTaskString = createNewTaskString(task);
    listTask?.insertAdjacentHTML("beforeend", newTaskString);
  }
}

export function renderStatistics(statistics: Statistics) {
  commentsTag.textContent = "" + statistics.getComments();
  commentsTodayTag.textContent = "" + statistics.getCommentsToday();
  doneTasksTag.textContent = "" + statistics.getDoneTasks();
  undoneTasksTag.textContent = "" + statistics.getUndoneTasks();
  mostActiveComentatorTag.textContent = "" + statistics.getMostActiveCommentator();
}
