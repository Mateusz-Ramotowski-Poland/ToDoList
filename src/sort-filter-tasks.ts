import { Task } from "./interfaces";
import { getFormattedDate } from "./add-comment-and-task";
import { btnSortArray } from "./main";

let btnSortingState = "descending sorting";

export function sortTasks(tasks: Task[]): Task[] {
  if (btnSortingState === "descending sorting") {
    btnSortingState = "ascending sorting";
    (btnSortArray as HTMLButtonElement).textContent = "Sort ascending";
  } else {
    btnSortingState = "descending sorting";
    (btnSortArray as HTMLButtonElement).textContent = "Sort descending";
  }

  return tasks.sort(function (a: Task, b: Task) {
    const taskADueDate = a.dueDate.toUpperCase();
    const taskBDueDate = b.dueDate.toUpperCase();

    if (taskADueDate < taskBDueDate) return btnSortingState === "descending sorting" ? -1 : 1;
    if (taskADueDate > taskBDueDate) return btnSortingState === "descending sorting" ? 1 : -1;
    return 0;
  });
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

  if (btnSortingState === "ascending sorting") {
    return tasks
      .map((x) => x)
      .reverse()
      .filter((el) => el.dueDate >= fromDate.value && el.dueDate <= toDate.value);
  }

  return tasks.filter((el) => el.dueDate >= fromDate.value && el.dueDate <= toDate.value);
}
