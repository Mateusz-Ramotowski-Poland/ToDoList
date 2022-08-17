import { taskArray } from "./add-all-event-listeners";
import { getTaskIndex } from "./drag-drop-subtasks";
import { saveTasksInLocalStorage } from "./add-comment-and-task";

export function uploadImage(event) {
  if ((event.target as Element)?.getAttribute("name") !== "upload-file") return;

  const actualTask = event.target.closest(".task");
  const imgTag = actualTask.querySelector("img");
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.addEventListener(
    "load",
    () => {
      imgTag.src = reader.result;
      imgTag.hidden = false;
      const taskIndex = getTaskIndex(taskArray, actualTask);
      taskArray[taskIndex].imgSrc = imgTag.src;
      saveTasksInLocalStorage(taskArray);
    },
    false
  );

  if (file) {
    reader.readAsDataURL(file);
  }
}
