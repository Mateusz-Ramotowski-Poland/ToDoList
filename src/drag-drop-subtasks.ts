export function prepareSubtaskForMoving(event) {
  if (event.target.closest(".subtask") === null) return;

  const subtaskTag = event.target.closest(".subtask");
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
    console.log(x, y);
    console.log(document.elementFromPoint(x, y));

    document.removeEventListener("mousemove", onMouseMove);
    subtaskTag.onmouseup = null;
  };
}
