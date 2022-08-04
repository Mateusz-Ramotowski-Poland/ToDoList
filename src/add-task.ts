const btnAddTask: HTMLButtonElement | null = document.querySelector(
  ".manage-task__btn-add-task"
);
const listTask: HTMLUListElement | null = document.querySelector(".tasks");
const textInputTask: HTMLInputElement | null = document.querySelector(
  ".manage-task__textInput"
);

function addNewTask(event: MouseEvent): void {
  if (!textInputTask?.checkValidity()) {
    textInputTask?.reportValidity();
    return;
  }
  event.preventDefault();

  /*     const newTask: string = `
    <div class="task">
        <div class="task__main">
            <h2 class="task__title">${textInputTask.value}</h2>
            <input type="checkbox" name="" id="" class="task__checkbox"/>
            <input type="date" name="" id="" class="task__date"/>          
        </div>   
    </div>
    `; */
  const newTask: string = `
    <div class="task">
    <div class="task__main">
      <h2 class="task__title">${textInputTask.value}</h2>
      <input type="checkbox" name="" id="" class="task__checkbox"/>
      <input type="date" name="" id="" class="task__date"/>            
    </div>

    <div class="task__comments">
      <input type="text" name="" id="" placeholder="Author" />
      <input type="text" name="" id="" placeholder="Comment" />
      <button hidden>Add comment</button>
    </div>
    
    </div>
    `;

  listTask?.insertAdjacentHTML("beforeend", newTask);
}
btnAddTask?.addEventListener("click", addNewTask);
