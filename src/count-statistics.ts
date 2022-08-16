import { Task, Comment } from "./interfaces";
import { getFormattedDate } from "./add-comment-and-task";

export class Statistics {
  #comments = 0;
  #commentsToday = 0;
  #doneTasks = 0;
  #undoneTasks = 0;
  #commentators = [];
  #mostActiveCommentator = "";

  constructor(taskArray: Task[]) {
    this.#comments = this.countComments(taskArray);
    this.#commentsToday = this.countCommentsToday(taskArray);
    this.#doneTasks = this.countUnodoneDoneTasks(taskArray).doneTasks;
    this.#undoneTasks = this.countUnodoneDoneTasks(taskArray).undoneTasks;
    this.addComentators(taskArray);
    this.evaluateMostActiveCommentator(taskArray);
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

  addComentator(comment) {
    const indexOfAuthor = this.#commentators.findIndex((el) => el.author === comment.author);
    if (indexOfAuthor === -1) {
      this.#commentators.push({ author: comment.author, numberOfComments: 1 });
    } else {
      this.#commentators[indexOfAuthor].numberOfComments++;
    }
  }

  addComentators(tasks: Task[]) {
    for (const task of tasks) {
      for (const comment of task.comments) {
        this.addComentator(comment);
      }
    }
  }

  evaluateMostActiveCommentator(tasks: Task[]) {
    let mostActiveComentator = "";
    let theMostComments = 0;
    for (const comentator of this.#commentators) {
      if (comentator.numberOfComments > theMostComments) {
        mostActiveComentator = comentator.author;
        theMostComments = comentator.numberOfComments;
      }
    }

    this.#mostActiveCommentator = mostActiveComentator;
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

  getMostActiveCommentator() {
    return this.#mostActiveCommentator;
  }

  addOneUndoneTask() {
    this.#undoneTasks++;
  }
  subtractOneUndoneTask() {
    this.#undoneTasks--;
  }
  addOneDoneTask() {
    this.#doneTasks++;
  }
  subtractOneDoneTask() {
    this.#doneTasks--;
  }

  addComments(comment: Comment) {
    this.#comments++;
    const today = getFormattedDate(new Date(), true);
    if (comment.date.slice(0, 10) === today) {
      this.#commentsToday++;
    }
  }
}
