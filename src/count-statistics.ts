import { Task } from "./interfaces";
import { getFormattedDate } from "./add-comment-and-task";

export class Statistics {
  #comments = 0;
  #commentsToday = 0;
  #doneTasks = 0;
  #undoneTasks = 0;

  constructor(taskArray: Task[]) {
    this.#comments = this.countComments(taskArray);
    this.#commentsToday = this.countCommentsToday(taskArray);
    this.#doneTasks = this.countUnodoneDoneTasks(taskArray).doneTasks;
    this.#undoneTasks = this.countUnodoneDoneTasks(taskArray).undoneTasks;
  }

  countComments(tasks: Task[]): number {
    let comments = 0;
    for (const task of tasks) {
      comments += task.comments.length;
    }
    return comments;
  }

  countCommentsToday(tasks: Task[]): number {
    let commentsToday = 0;
    const today = getFormattedDate(new Date(), true);
    for (const task of tasks) {
      for (const comment of task.comments) {
        //comment.date example - '2022-08-15 14:49:41'
        if (comment.date.slice(0, 10) === today) commentsToday++;
      }
    }
    return commentsToday;
  }

  countUnodoneDoneTasks(tasks: Task[]) {
    let doneTasks = 0;
    let undoneTasks = 0;
    for (const task of tasks) {
      if (task.done === true) {
        doneTasks++;
      } else {
        undoneTasks++;
      }
    }
    return { doneTasks: doneTasks, undoneTasks: undoneTasks };
  }

  getComments() {
    return this.#comments;
  }
  getCommentsToday() {
    return this.#commentsToday;
  }
  getUndoneTasks() {
    return this.#undoneTasks;
  }
  getDoneTasks() {
    return this.#doneTasks;
  }
}
