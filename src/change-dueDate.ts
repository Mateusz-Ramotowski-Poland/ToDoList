import { listTask, saveTasksInLocalStorage } from "./add-comment-and-task";
import { taskArray } from "./init";

function changeTaskDueDate(event: Event) {
  if (!((event.target as Element)?.getAttribute("name") === "task__date")) {
    return;
  }

  const chosenTask: Element | null = (event?.target as Element)?.closest(".task");
  const indexOfChangedTask: number = taskArray.findIndex(
    (el) => el.id.toString() === (chosenTask as HTMLElement)?.dataset.id
  );

  taskArray[indexOfChangedTask].dueDate = (event.target as HTMLInputElement)?.value;
  saveTasksInLocalStorage(taskArray);
}

listTask?.addEventListener("input", changeTaskDueDate);
