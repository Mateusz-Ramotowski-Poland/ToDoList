export function moveSubtask(event) {
  const clickedSubtaskDescription = event.target.closest(".subtask__description");
  if (clickedSubtaskDescription === null) return;

  const clickedSubtask = clickedSubtaskDescription.closest(".subtask");
  const initialClickedSubtaskPosition = clickedSubtask.closest(".task__subtasks");
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

    if (newTask === null || newTask === undefined) {
      initialClickedSubtaskPosition?.insertAdjacentElement("afterbegin", clickedSubtask);
    } else {
      const newTasksList = newTask?.querySelector(".task__subtasks");
      newTasksList?.insertAdjacentElement("afterbegin", clickedSubtask);
    }

    document.removeEventListener("mousemove", onMouseMove);
    clickedSubtask.onmouseup = null;
  };
}
