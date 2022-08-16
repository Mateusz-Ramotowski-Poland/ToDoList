import { saveTasksInLocalStorage } from "./add-comment-and-task";
import { Task } from "./interfaces";
import { taskArray } from "./add-all-event-listeners";

function findLocationInArray(tasks: Task[], clickedSubtask: HTMLElement) {
  const clickedTask = clickedSubtask.closest(".task");
  /*   console.log(clickedTask); */
  const clickedTaskIndex = tasks.findIndex((task) => task.id === parseInt(clickedTask?.dataset.id));
  /*   console.log(clickedTaskIndex);
  const taskInArray = taskArray[clickedTaskIndex];
  console.log(taskInArray); */
  const clickedSubtaskIndex = taskArray[clickedTaskIndex].subtasks.findIndex(
    (subtask) => subtask.id === parseInt(clickedSubtask?.dataset.id)
  );
  /* console.log(clickedSubtaskIndex); */
  /*   console.log(clickedTask?.dataset.id);
  console.log(typeof clickedTask?.dataset.id); */
  console.log({ taskIndex: clickedTaskIndex, subtaskIndex: clickedSubtaskIndex });
  return { task: clickedTaskIndex, subtask: clickedSubtaskIndex };
}

function getTaskIndex(tasks: Task[], clickedTask: HTMLElement) {
  return tasks.findIndex((task) => task.id === parseInt(clickedTask?.dataset.id));
}

export function moveSubtask(event) {
  const clickedSubtaskDescription = event.target.closest(".subtask__description");
  if (clickedSubtaskDescription === null) return;

  const clickedSubtask = clickedSubtaskDescription.closest(".subtask");
  const initialTask = clickedSubtaskDescription.closest(".task");
  const initialClickedSubtaskPosition = clickedSubtask.closest(".task__subtasks");

  const removeLocation = findLocationInArray(taskArray, clickedSubtask);

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

    console.log(newTask);
    if (newTask === initialTask) {
      initialClickedSubtaskPosition?.insertAdjacentElement("afterbegin", clickedSubtask);
      console.log("same");
    } else {
      const newTasksList = newTask?.querySelector(".task__subtasks");
      console.log(newTasksList);
      newTasksList?.insertAdjacentElement("afterbegin", clickedSubtask);
      taskArray[removeLocation.task].subtasks.splice(removeLocation.subtask, 1); // delete one item from arr
      console.log(clickedSubtask);
      console.dir(clickedSubtask);
      console.log(clickedSubtask.querySelector("input").checked);
      taskArray[getTaskIndex(taskArray, newTask)].subtasks.push({
        subtask: clickedSubtask.querySelector("p").textContent,
        done: clickedSubtask.querySelector("input").checked,
        id: clickedSubtask.dataset.id,
      });
      saveTasksInLocalStorage(taskArray);
    }

    document.removeEventListener("mousemove", onMouseMove);
    clickedSubtask.onmouseup = null;
  };
}
