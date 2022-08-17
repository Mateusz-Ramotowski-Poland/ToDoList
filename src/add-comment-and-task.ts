import { listTask, statistics } from "./main";
import { taskArray } from "./add-all-event-listeners";
import { Task, Comment } from "./interfaces";
import { findIndexOfCurrentTask } from "./change-due-date";
import { createNewSubtaskTemplate } from "./add-subtask";
import { renderStatistics } from "./render-tasks-statistics";

export function saveTasksInLocalStorage(tasks: Task[]) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

export function checkInputValidity(input: HTMLInputElement | null | undefined): boolean {
  if (!input?.checkValidity()) {
    input?.reportValidity();
    return false;
  } else {
    return true;
  }
}

export function clearInputField(input: HTMLInputElement | null) {
  if (input) {
    input.value = "";
  }
}

export function getFormattedDate(date: Date, onlyYearMonthDay: boolean = false): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hour = date.getHours().toString().padStart(2, "0");
  const minute = date.getMinutes().toString().padStart(2, "0");
  const second = date.getSeconds().toString().padStart(2, "0");

  if (onlyYearMonthDay) return `${year}-${month}-${day}`;
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

export function createNewTaskTemplate({ title, dueDate, id, comments, subtasks, done, imgSrc }: Task): string {
  const commentsString = comments.map((comment) => createNewCommentTemplate(comment)).join("");
  const subtasksTemplate = subtasks.map((subtask) => createNewSubtaskTemplate(subtask)).join("");

  return `
<div class="task" data-id=${id}>
  <div class="task__main">
    <h2 class="task__title">${title}</h2>
    <input type="checkbox" name="task__checkbox" ${done === true ? "checked" : ""}/>
    <input type="date" name="task__date" value="${dueDate}" />
  </div>
 
  <input type="file" name="upload-file"><br>
  <img src="${imgSrc === "" ? "" : imgSrc}" height="100" width='100' alt="uploaded" ${imgSrc === "" ? "hidden" : ""}>

  <div class="task__subtasks">
    ${subtasksTemplate}
    <form>
      <input type="text" name="task_subtask-desciption" required minlength="4" />
      <button type="submit" class="task__ad-subtask">Add subtask</button>
    </form>
  </div>

  <form class="task__comments">
    <input
      type="text"
      name="input-author"
      placeholder="Author"
      required
      minlength="4"
    />
    <input
      type="text"
      name="input-comment"
      placeholder="Comment"
      required
      minlength="4"
    />
    <button class="task__btn-add-comment" type="submit">Add comment</button>
  </form>
  <div class="comments">
    ${commentsString}
  </div>
</div>
  `;
}

export function createIdNumber() {
  return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
}

export function addNewTask(event: Event): void {
  event.preventDefault();
  const textInputTask: HTMLInputElement | null = document.querySelector("[name='manage-task__textInput']");
  if (!checkInputValidity(textInputTask)) return;

  const date = new Date();
  const id = createIdNumber();

  const newTask = {
    title: textInputTask?.value,
    dueDate: getFormattedDate(date, true),
    id: id,
    comments: [],
    subtasks: [],
    done: false,
    imgSrc: "",
  };
  taskArray.push(newTask);
  const newTaskString: string = createNewTaskTemplate(newTask);

  listTask?.insertAdjacentHTML("beforeend", newTaskString);
  clearInputField(textInputTask);
  saveTasksInLocalStorage(taskArray);
  statistics.addOneUndoneTask();
  renderStatistics(statistics);
}

export function createNewCommentTemplate({ author, comment, date }: Comment) {
  return `
  <p class="comment">
    ${date}. ${author}:${comment}
  </p>
  `;
}

export function addNewComment(event: Event): void {
  if (!(event?.target as Element)?.classList.contains("task__btn-add-comment")) {
    return;
  }

  event.preventDefault();

  const currentTask = (event.target as Element).closest(".task");
  const inputAuthor: HTMLInputElement | null = currentTask?.querySelector("[name='input-author']") || null;
  const inputComment: HTMLInputElement | null = currentTask?.querySelector("[name='input-comment']") || null;
  const comments: HTMLDivElement | null = currentTask?.querySelector(".comments") || null;

  if (!checkInputValidity(inputAuthor)) return;
  if (!checkInputValidity(inputComment)) return;

  const date = new Date();
  const newComment: Comment = {
    author: inputAuthor?.value as string,
    comment: inputComment?.value as string,
    date: getFormattedDate(date),
  };

  const newCommentString = createNewCommentTemplate(newComment);
  comments?.insertAdjacentHTML("beforeend", newCommentString);

  const indexOfChangedTask = findIndexOfCurrentTask(currentTask);

  const commentsArrOfChangedTask = taskArray[indexOfChangedTask].comments;
  commentsArrOfChangedTask.push(newComment);

  clearInputField(inputAuthor);
  clearInputField(inputComment);
  saveTasksInLocalStorage(taskArray);
  statistics.addComments(commentsArrOfChangedTask[commentsArrOfChangedTask.length - 1]);
  statistics.addComentator(newComment);
  statistics.evaluateMostActiveCommentator(taskArray);

  renderStatistics(statistics);
}
