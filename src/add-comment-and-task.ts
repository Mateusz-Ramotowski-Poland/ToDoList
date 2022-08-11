import { listTask, taskArray } from "./main";
import { Task, Comment } from "./interfaces";
import { findIndexOfCurrentTask } from "./change-due-date";
import { createNewSubtaskTemplate } from "./add-subtask";

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

function getFormattedDate(date: Date, onlyYearMonthDay: boolean = false): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hour = date.getHours().toString().padStart(2, "0");
  const minute = date.getMinutes().toString().padStart(2, "0");
  const second = date.getSeconds().toString().padStart(2, "0");

  if (onlyYearMonthDay) return `${year}-${month}-${day}`;
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

export function createNewTaskString({ title, dueDate, id, comments, subtasks, done }: Task): string {
  const commentsString = comments.map((comment) => createNewCommentTemplate(comment)).join("");
  const subtasksString = subtasks.map((subtask) => createNewSubtaskTemplate(subtask)).join("");

  return `
<div class="task" data-id=${id}>
  <div class="task__main">
    <h2 class="task__title">${title}</h2>
    <input type="checkbox" name="task__checkbox" ${done === true ? "checked" : ""}/>
    <input type="date" name="task__date" value="${dueDate}" />
    <button name="task__photo" type="submit">Upload photo </button>
  </div>

  <div class="task__subtasks">
    ${subtasksString}
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
  };
  taskArray.push(newTask);
  const newTaskString: string = createNewTaskString(newTask);

  listTask?.insertAdjacentHTML("beforeend", newTaskString);
  clearInputField(textInputTask);
  saveTasksInLocalStorage(taskArray);
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

  taskArray[indexOfChangedTask].comments.push(newComment);

  clearInputField(inputAuthor);
  clearInputField(inputComment);
  saveTasksInLocalStorage(taskArray);
}
