export function prepareSubtaskForMoving(event) {
  if (event.target.closest(".subtask") === null) return;

  const subtaskTag = event.target.closest(".subtask");
  const initialSubtaskTagPosition = subtaskTag.closest(".task__subtasks");

  subtaskTag.style.position = "absolute";
  subtaskTag.style.zIndex = 100;
  document.body.append(subtaskTag);

  function moveAt(pageX, pageY) {
    subtaskTag.style.left = pageX - subtaskTag.offsetWidth / 2 + "px";
    subtaskTag.style.top = pageY - subtaskTag.offsetHeight / 2 + "px";
  }

  moveAt(event.pageX, event.pageY);

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  document.addEventListener("mousemove", onMouseMove);

  subtaskTag.onmouseup = function (event) {
    const x = event.clientX;
    const y = event.clientY;
    subtaskTag.style.zIndex = -1;
    const newTask = document.elementFromPoint(x, y)?.closest(".task");
    subtaskTag.style.zIndex = 0;
    subtaskTag.style.position = "static";

    if (newTask === null || newTask === undefined) {
      initialSubtaskTagPosition?.insertAdjacentElement("afterbegin", subtaskTag);
    } else {
      const newTasksLIst = newTask?.querySelector(".task__subtasks");
      newTasksLIst?.insertAdjacentElement("afterbegin", subtaskTag);
    }

    subtaskTag.style.zIndex = 100;
    document.removeEventListener("mousemove", onMouseMove);
    subtaskTag.onmouseup = null;
  };
}
