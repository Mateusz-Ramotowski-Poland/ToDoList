import { saveTasksInLocalStorage } from "./add-comment-and-task";
import { Task } from "./interfaces";
import { taskArray } from "./add-all-event-listeners";

function getTaskIndex(tasks: Task[], clickedTask: HTMLElement) {
  return tasks.findIndex((task) => task.id === parseInt(clickedTask?.dataset.id as string));
}

function findLocationInArray(tasks: Task[], clickedSubtask: HTMLElement) {
  const clickedTask = clickedSubtask.closest(".task") as HTMLElement;
  const clickedTaskIndex = tasks.findIndex((task) => task.id === parseInt(clickedTask?.dataset.id as string));
  const clickedSubtaskIndex = taskArray[clickedTaskIndex].subtasks.findIndex(
    (subtask) => subtask.id === parseInt(clickedSubtask?.dataset.id as string)
  );
  return { task: clickedTaskIndex, subtask: clickedSubtaskIndex };
}

export function moveSubtask(event) {
  const clickedSubtaskDescription = event.target.closest(".subtask__description");
  if (clickedSubtaskDescription === null) return;

  const clickedSubtask = clickedSubtaskDescription.closest(".subtask");
  const clickedTask = clickedSubtaskDescription.closest(".task");
  const clickedSubtaskList = clickedSubtask.closest(".task__subtasks");
  const whereRemove = findLocationInArray(taskArray, clickedSubtask);
  clickedSubtask.style.position = "absolute";
  clickedSubtask.style.zIndex = 100;
  document.body.append(clickedSubtask);
  function moveAt(pageX, pageY) {
    clickedSubtask.style.left = pageX - clickedSubtask.offsetWidth / 2 + "px";
    clickedSubtask.style.top = pageY - clickedSubtask.offsetHeight / 2 + "px";
  }

  moveAt(event.pageX, event.pageY);
  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }
  document.addEventListener("mousemove", onMouseMove);

  clickedSubtask.onmouseup = function (event) {
    const x = event.clientX;
    const y = event.clientY;
    clickedSubtask.style.zIndex = -1;
    const newTask = document.elementFromPoint(x, y)?.closest(".task");
    clickedSubtask.style.zIndex = 0;
    clickedSubtask.style.position = "relative";
    clickedSubtask.style.top = "0px";
    clickedSubtask.style.left = "0px";

    if (newTask === clickedTask || newTask === null) {
      clickedSubtaskList?.insertAdjacentElement("afterbegin", clickedSubtask);
    } else {
      const newTasksList = newTask?.querySelector(".task__subtasks");
      newTasksList?.insertAdjacentElement("afterbegin", clickedSubtask);
      taskArray[whereRemove.task].subtasks.splice(whereRemove.subtask, 1);
      taskArray[getTaskIndex(taskArray, newTask)].subtasks.push({
        subtask: clickedSubtask.querySelector("p").textContent,
        done: clickedSubtask.querySelector("input").checked,
        id: parseInt(clickedSubtask.dataset.id),
      });
      saveTasksInLocalStorage(taskArray);
    }
    document.removeEventListener("mousemove", onMouseMove);
    clickedSubtask.onmouseup = null;
  };
}
