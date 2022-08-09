const btnAddTask: HTMLButtonElement | null = document.querySelector(
  ".manage-task__btn-add-task"
);
export const listTask: HTMLUListElement | null =
  document.querySelector(".tasks");

function checkInputValidity(
  input: HTMLInputElement | Element | null | undefined
): boolean {
  if (!input?.checkValidity()) {
    input?.reportValidity();
    return false;
  } else {
    return true;
  }
}
function clearInputField(
  input: HTMLInputElement | null | Element | undefined
): void {
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

function addNewTask(event: MouseEvent): void {
  event.preventDefault();

  const textInputTask: HTMLInputElement | null = document.querySelector(
    ".manage-task__textInput"
  );

  if (!checkInputValidity(textInputTask)) return;

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

  listTask?.insertAdjacentHTML("beforeend", newTask);

  clearInputField(textInputTask);
}
btnAddTask?.addEventListener("click", addNewTask);

function addNewComment(event: MouseEvent): void {
  if (!event?.target?.classList?.contains("task__btn-add-comment")) {
    return;
  }

  event.preventDefault();

  const currentTask = event.target.closest(".task");
  const textInputComments = currentTask.querySelectorAll(
    ".task__comments input"
  );
  const inputAuthor: Element | undefined = textInputComments[0];
  const inputComment: Element | undefined = textInputComments[1];

  const comments: HTMLDivElement | null =
    currentTask.querySelector(".comments");

  if (!checkInputValidity(inputAuthor)) return;
  if (!checkInputValidity(inputComment)) return;

  const date = new Date();
  const actualDate: string = `${getFormattedDate(date)}`;

  const newComment: string = `
  <p class="comment">
    ${actualDate}. ${inputAuthor?.value}: ${inputComment?.value}
  </p>
    `;

  comments?.insertAdjacentHTML("beforeend", newComment);
  clearInputField(inputAuthor);
  clearInputField(inputComment);
}

listTask?.addEventListener("click", addNewComment);
