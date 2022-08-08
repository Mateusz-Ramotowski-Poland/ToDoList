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
function clearInputField(input: HTMLInputElement | null | Element | undefined):void {
  if(input) {
    input.value = '';
  }
}

function addNewTask(event: MouseEvent): void {
  event.preventDefault();

  const textInputTask: HTMLInputElement | null = document.querySelector(
    ".manage-task__textInput"
  );

  if (!checkInputValidity(textInputTask)) return;

  const newTask: string = `
  <div class="task">
          <div class="task__main">
                    <h2 class="task__title">${textInputTask?.value}</h2>
                    <input type="checkbox" name="" id="" class="task__checkbox" />
                    <input type="date" name="" id="" class="task__date" />
                    <button class="task__photo">Upload photo</button>
          </div>

                  <div class="task__subtasks">
                    <input type="text" name="" id="" />
                    <button>Add subtask</button>
                  </div>

                  <form class="task__comments">
                    <input
                      type="text"
                      name=""
                      id=""
                      placeholder="Author"
                      required
                      minlength="4"
                    />
                    <input
                      type="text"
                      name=""
                      id=""
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
  event.preventDefault();

  if (!event?.target?.classList?.contains("task__btn-add-comment")) {
    return;
  }

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
  const actualDate: string = `${date.getDay()}.${date.getMonth()}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

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
