import { findIndexOfCurrentTask } from "./change-due-date";
import { taskArray } from "./main";
import { saveTasksInLocalStorage } from "./add-comment-and-task";

export function changeTaskCheckboxValue(event: Event) {
  if (!((event.target as Element)?.getAttribute("name") === "task__checkbox")) {
    return;
  }

  const currentTask = (event.target as Element).closest(".task");
  const indexOfChangedTask = findIndexOfCurrentTask(currentTask);
  taskArray[indexOfChangedTask].done = (event.target as HTMLInputElement).checked;
  saveTasksInLocalStorage(taskArray);
}

function findIndexOfSubtask(indexOfChangedTask: number, currentSubtaskCheckbox: HTMLInputElement) {
  const currentSubtask = currentSubtaskCheckbox.closest(".subtask");
  return taskArray[indexOfChangedTask].subtasks.findIndex(
    (el) => el.id.toString() === (currentSubtask as HTMLElement)?.dataset.id
  );
}

export function changeSubtaskCheckboxValue(event: Event) {
  if (!((event.target as Element)?.getAttribute("name") === "task__checkbox--subtask")) {
    return;
  }

  const currentTask = (event.target as Element).closest(".task");
  const indexOfChangedTask = findIndexOfCurrentTask(currentTask);
  const indexOfChangedSubtask = findIndexOfSubtask(indexOfChangedTask, event.target as HTMLInputElement);

  taskArray[indexOfChangedTask].subtasks[indexOfChangedSubtask].done = (event.target as HTMLInputElement).checked; //works
  saveTasksInLocalStorage(taskArray);
}
