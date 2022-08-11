import { checkInputValidity, clearInputField } from "./add-comment-and-task";
import { taskArray } from "./main";
import { saveTasksInLocalStorage } from "./add-comment-and-task";
import { findIndexOfCurrentTask } from "./change-due-date";
import { Subtask } from "./interfaces";
import { createIdNumber } from "./add-comment-and-task";

export function createNewSubtaskTemplate(subtask: Subtask) {
  return `
  <div class="subtask" data-id='${subtask.id}'>
    <p>${subtask.subtask}</p>
    <input type="checkbox" name="task__checkbox--subtask" ${subtask.done === true ? "checked" : ""}/>
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

  const id = createIdNumber();
  const newSubtask = createNewSubtaskTemplate({ subtask: subtaskInput?.value as string, done: false, id: id });
  subtasksContainer?.insertAdjacentHTML("afterbegin", newSubtask);

  const indexOfChangedTask = findIndexOfCurrentTask(currentTask);
  taskArray[indexOfChangedTask].subtasks.push({ subtask: subtaskInput?.value as string, done: false, id: id });

  clearInputField(subtaskInput);
  saveTasksInLocalStorage(taskArray);
}
