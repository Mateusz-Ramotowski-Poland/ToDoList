const btnAddTask: HTMLButtonElement | null = document.querySelector(
  ".manage-task__btn-add-task"
);
const listTask: HTMLUListElement | null = document.querySelector(".tasks");
const textInputTask: HTMLInputElement | null = document.querySelector(
  ".manage-task__textInput"
);


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

function addNewTask(event: MouseEvent): void {
  event.preventDefault();

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
}
btnAddTask?.addEventListener("click", addNewTask);

function addNewComment(event: MouseEvent): void {
  event.preventDefault();

  if (!event?.target?.classList?.contains("task__btn-add-comment")) {
    console.log("nie przycisk");
    return;
  }

const currentTask = event.target.closest('.task');
console.log(currentTask);
const textInputComments = currentTask.querySelectorAll(".task__comments input");
const inputAuthor: Element | undefined = textInputComments[0];
const inputComment: Element | undefined = textInputComments[1];
console.log(inputAuthor, inputComment);
const comments: HTMLDivElement | null = currentTask.querySelector(".comments");


  
  console.log("Przycisk");
  if (!checkInputValidity(inputAuthor)) return;
  if (!checkInputValidity(inputComment)) return;

  const newComment: string = `
  <p class="comment">
    <span>${inputAuthor?.value}: ${inputComment?.value}</span>
  </p>
    `;

  comments?.insertAdjacentHTML("beforeend", newComment);
}

listTask?.addEventListener("click", addNewComment);
