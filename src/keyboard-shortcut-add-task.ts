import { btnAddTask } from "./main";

export function addTaskUsingKeyboard(event: KeyboardEvent) {
  if (!(event.ctrlKey && (event.key === "v" || event.key === "v"))) return;

  btnAddTask?.dispatchEvent("click");
  //condition works
  // now create event
  console.dir(event);
}
