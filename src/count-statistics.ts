import { taskArray } from "./add-all-event-listeners";
import { Statistics, Task } from "./interfaces";
import { getFormattedDate } from "./add-comment-and-task";

export function getcountedComments(tasks: Task[]): number {
  let comments = 0;
  for (const task of tasks) {
    comments += task.comments.length;
  }
  return comments;
}

export function getcountedCommentsToday(tasks: Task[]): number {
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
