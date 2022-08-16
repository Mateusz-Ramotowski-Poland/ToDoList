import { btnAddTask } from "./main";

export function addTaskUsingKeyboard(event: KeyboardEvent) {
  if (!(event.ctrlKey && (event.key === "m" || event.key === "M"))) return;

  btnAddTask?.click();
}
