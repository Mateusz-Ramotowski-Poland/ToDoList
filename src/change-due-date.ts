import { saveTasksInLocalStorage } from "./add-comment-and-task";
import { taskArray } from "./main";

export function findIndexOfCurrentTask(currentTask: Element | null): number {
  return taskArray.findIndex((el) => el.id.toString() === (currentTask as HTMLElement)?.dataset.id);
}

export function changeTaskDueDate(event: Event) {
  if (!((event.target as Element)?.getAttribute("name") === "task__date")) {
    return;
  }

  const chosenTask: Element | null = (event?.target as Element)?.closest(".task");
  const indexOfChangedTask = findIndexOfCurrentTask(chosenTask);

  taskArray[indexOfChangedTask].dueDate = (event.target as HTMLInputElement)?.value;
  saveTasksInLocalStorage(taskArray);
}
