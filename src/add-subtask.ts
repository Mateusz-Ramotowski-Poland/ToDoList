import { checkInputValidity, clearInputField } from "./add-comment-and-task";
import { taskArray } from "./main";
import { saveTasksInLocalStorage } from "./add-comment-and-task";
import { findIndexOfCurrentTask } from "./change-due-date";
import { Subtask } from "./interfaces";

export function createNewSubtaskString(subtask: Subtask) {
  return `
  <div class="subtask">
    <p>${subtask.subtask}</p>
    <input type="checkbox" name="task__checkbox" ${subtask.done === true ? "checked" : ""}/>
  </div>
    `;
}

export function addNewSubtask(event: Event): void {
  if (!(event?.target as Element)?.classList.contains("task__ad-subtask")) {
    return;
  }

  event.preventDefault();
  const currentTask = (event.target as Element).closest(".task");
  const subtaskInput: HTMLInputElement | null = currentTask?.querySelector("[name='task_subtask-desciption']") || null;
  if (!checkInputValidity(subtaskInput)) return;
  const subtasksContainer: HTMLInputElement | null = currentTask?.querySelector(".task__subtasks") || null;

  const newSubtask = createNewSubtaskString({ subtask: subtaskInput?.value as string, done: false });
  subtasksContainer?.insertAdjacentHTML("afterbegin", newSubtask);

  const indexOfChangedTask = findIndexOfCurrentTask(currentTask);
  taskArray[indexOfChangedTask].subtasks.push({ subtask: subtaskInput?.value as string, done: false });

  clearInputField(subtaskInput);
  saveTasksInLocalStorage(taskArray);
}
