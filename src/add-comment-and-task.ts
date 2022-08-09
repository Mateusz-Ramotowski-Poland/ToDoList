export interface Task {
  title: string | undefined;
  dueDate: string;
  id: number;
}

const btnAddTask: HTMLButtonElement | null = document.querySelector(".manage-task__btn-add-task");
export const listTask: HTMLUListElement | null = document.querySelector(".tasks");
export const taskArray: Task[] = [];

function checkInputValidity(input: HTMLInputElement | null | undefined): boolean {
  if (!input?.checkValidity()) {
    input?.reportValidity();
    return false;
  } else {
    return true;
  }
}

function clearInputField(input: HTMLInputElement | null) {
  if (input) {
    input.value = "";
  }
}

function getYearMonthDayString(): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const actualDate: string = `${year}-${month}-${day}`;
  return actualDate;
}

export function createNewTaskString(title: string | undefined, date: string, id: number): string {
  return `
<div class="task" data-id=${id}>
  <div class="task__main">
    <h2 class="task__title">${title}</h2>
    <input type="checkbox" name="task__checkbox" />
    <input type="date" name="task__date" value="${date}" />
    <button name="task__photo" type="submit">Upload photo </button>
  </div>

  <form class="task__subtasks">
    <input type="text" name="task_subtask-desciption" />
    <button  type="submit">Add subtask</button>
  </form>

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
  <div class="comments"></div>
</div>
  `;
}

function addNewTask(event: Event): void {
  event.preventDefault();

  const textInputTask: HTMLInputElement | null = document.querySelector("[name='manage-task__textInput']");
  if (!checkInputValidity(textInputTask)) return;

  const id: number = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
  const newTask: string = createNewTaskString(textInputTask?.value, getYearMonthDayString(), id);

  taskArray.push({
    title: textInputTask?.value,
    dueDate: getYearMonthDayString(),
    id: id,
  });

  listTask?.insertAdjacentHTML("beforeend", newTask);
  clearInputField(textInputTask);
}
btnAddTask?.addEventListener("click", addNewTask);

function addNewComment(event: Event): void {
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
  const actualDate: string = `${getYearMonthDayString()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  const newComment: string = `
  <p class="comment">
    ${actualDate}. ${inputAuthor?.value}:${inputComment?.value}
  </p>
    `;

  comments?.insertAdjacentHTML("beforeend", newComment);
  clearInputField(inputAuthor);
  clearInputField(inputComment);
}
listTask?.addEventListener("click", addNewComment);
