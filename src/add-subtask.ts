import { listTask, checkInputValidity, clearInputField } from "./add-comment-and-task";

function addNewSubtask(event: Event): void {
  if (!(event?.target as Element)?.classList.contains("task__ad-subtask")) {
    return;
  }

  event.preventDefault();
  const currentTask = (event.target as Element).closest(".task");
  const subtaskInput: HTMLInputElement | null = currentTask?.querySelector("[name='task_subtask-desciption']") || null;
  if (!checkInputValidity(subtaskInput)) return;
  const subtasksContainer: HTMLInputElement | null = currentTask?.querySelector(".task__subtasks") || null;
  const newSubtask = `
    <div class="subtask">
      <p>${subtaskInput?.value}</p>
      <input type="checkbox" name="task__checkbox" />
    </div>
      `;

  subtasksContainer?.insertAdjacentHTML("afterbegin", newSubtask);
  clearInputField(subtaskInput);
}
listTask?.addEventListener("click", addNewSubtask);
