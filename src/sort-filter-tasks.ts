import { Task } from "./interfaces";

export function sortTasks(tasks: Task[]): Task[] {
  const deepCopyOfTasks = JSON.parse(JSON.stringify(tasks)) ?? [];

  return deepCopyOfTasks.sort(function (a: Task, b: Task) {
    const taskADueDate = a["dueDate"].toUpperCase();
    const taskeBDueDate = b["dueDate"].toUpperCase();
    if (taskADueDate < taskeBDueDate) return -1;
    if (taskADueDate > taskeBDueDate) return 1;
    return 0;
  });
}
