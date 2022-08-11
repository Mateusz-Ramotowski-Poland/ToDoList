import { Task } from "./interfaces";
import { getFormattedDate } from "./add-comment-and-task";

export function sortTasks(tasks: Task[], event): Task[] {
  let isButtonTextChangedNewly = false;

  if (event.target.textContent === "Sort tasks ascending") {
    event.target.textContent = "Sort tasks descending";
    isButtonTextChangedNewly = true;

    return tasks.sort(function (a: Task, b: Task) {
      const taskADueDate = a.dueDate.toUpperCase();
      const taskeBDueDate = b.dueDate.toUpperCase();
      if (taskADueDate < taskeBDueDate) return -1;
      if (taskADueDate > taskeBDueDate) return 1;
      return 0;
    });
  }

  if (event.target.textContent === "Sort tasks descending" && isButtonTextChangedNewly === false) {
    event.target.textContent = "Sort tasks ascending";

    return tasks.sort(function (a: Task, b: Task) {
      const taskADueDate = a.dueDate.toUpperCase();
      const taskeBDueDate = b.dueDate.toUpperCase();
      if (taskADueDate > taskeBDueDate) return -1;
      if (taskADueDate < taskeBDueDate) return 1;
      return 0;
    });
  }
}

export function filterTasks(tasks: Task[], event: Event) {
  event?.preventDefault();
  const fromDate = document.querySelector('[name="manage-task__start-date"]') as HTMLInputElement;
  const toDate = document.querySelector('[name="manage-task__end-date"]') as HTMLInputElement;
  const actualdate = getFormattedDate(new Date(), true);

  if (fromDate.value === "") {
    fromDate.value = actualdate;
  }
  if (toDate.value === "") {
    toDate.value = actualdate;
  }

  if (fromDate.value > toDate.value) {
    const temp = fromDate.value;
    fromDate.value = toDate.value;
    toDate.value = temp;
  }

  return tasks.filter((el) => el.dueDate >= fromDate.value && el.dueDate <= toDate.value);
}
