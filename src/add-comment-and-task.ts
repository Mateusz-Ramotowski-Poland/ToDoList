import { taskArray, Task } from "./init";

const btnAddTask: HTMLButtonElement | null = document.querySelector(".manage-task__btn-add-task");
export const listTask: HTMLUListElement | null = document.querySelector(".tasks");

function saveTasksInLocalStorage(tasks: Task[]) {
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
function getFormattedDate(
  date: Date,
  onlyYearMonthDay: boolean = false
): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hour = date.getHours().toString().padStart(2, "0");
  const minute = date.getMinutes().toString().padStart(2, "0");
  const second = date.getSeconds().toString().padStart(2, "0");

  if (onlyYearMonthDay) return `${year}-${month}-${day}`;
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
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

  <div class="task__subtasks">
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
  <div class="comments"></div>
</div>
  `;
}

  const date = new Date();
  const newTask: string = `
  <div class="task">
          <div class="task__main">
                    <h2 class="task__title">${textInputTask?.value}</h2>
                    <input type="checkbox"  class="task__checkbox" />
                    <input type="date" class="task__date" value='${getFormattedDate(
                      date,
                      true
                    )}'/>
                    <button class="task__photo">Upload photo</button>
          </div>

                  <div class="task__subtasks">
                    <input type="text" />
                    <button>Add subtask</button>
                  </div>

                  <form class="task__comments">
                    <input
                      type="text"
                      placeholder="Author"
                      required
                      minlength="4"
                    />
                    <input
                      type="text"
                      placeholder="Comment"
                      required
                      minlength="4"
                    />
                    <button class="task__btn-add-comment">Add comment</button>
                  </form>
            <div class="comments">

        </div>
  </div>
    `;

  taskArray.push({
    title: textInputTask?.value,
    dueDate: getYearMonthDayString(),
    id: id,
  });

  listTask?.insertAdjacentHTML("beforeend", newTask);
  clearInputField(textInputTask);
  saveTasksInLocalStorage(taskArray);
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
  const actualDate: string = `${getFormattedDate(date)}`;

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
